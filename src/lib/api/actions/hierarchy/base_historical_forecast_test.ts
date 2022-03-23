import {isException} from '@logi/base/ts/common/exception'
import {EditorServiceBuilder, handleAction} from '@logi/src/lib/api'
import {
    BookBuilder,
    isRow,
    isTable,
    RowBuilder,
    SheetBuilder,
    TableBuilder,
} from '@logi/src/lib/hierarchy/core'

import {ActionBuilder} from './base_historical_forecast'

describe('test base historical forecast action', (): void => {
    it('base historical forecast', (): void => {
        const row = new RowBuilder()
            .name('row1')
            .expression('expression')
            .build()
        const table = new TableBuilder().name('').subnodes([row]).build()
        const sheet = new SheetBuilder().name('').tree([table]).build()
        const book = new BookBuilder().name('').sheets([sheet]).build()
        const service = new EditorServiceBuilder().book(book).build()
        const action = new ActionBuilder().target(row.uuid).build()
        const res = handleAction(action, service)
        expect(isException(res)).toBe(false)
        if (isException(res))
            return
        const newTable = service.book.sheets[0].tree[0]
        expect(isTable(newTable)).toBe(true)
        if (!isTable(newTable))
            return
        expect(isRow(newTable.rows[1])).toBe(true)
        if (!isRow(newTable.rows[1]) || !isRow(newTable.rows[0]))
            return
        expect(newTable.rows[0].sliceExprs[0].name).toBe('历史期')
        expect(newTable.rows[0].sliceExprs[1].name).toBe('预测期')
        expect(newTable.rows[0].sliceExprs[0].expression).toBe('expression')
        expect(newTable.rows[0].sliceExprs[1].expression)
            .toBe('{row1}.lag(1y)*(1+{增长率@row1})')

        expect(newTable.rows[1].name).toBe('增长率')
        expect(newTable.rows[1].alias).toBe('row1')
        expect(newTable.rows[1].sliceExprs[0].name).toBe('历史期')
        expect(newTable.rows[1].sliceExprs[0].expression)
            .toBe('IFERROR({row1}/{row1}.lag(1y)-1,NULL)')
        expect(newTable.rows[1].sliceExprs[1].name).toBe('预测期')
        expect(newTable.rows[1].sliceExprs[1].expression)
            .toBe('{增长率@row1}[历史期].average()')
    })
})
