// tslint:disable:no-magic-numbers
import {Column, ColumnBuilder} from './column'
import {ColumnBlockBuilder} from './column_block'
import {NodeType} from './node'
import {isRow, Row, RowBuilder} from './row'
import {SliceExprBuilder} from './slice_expr'
import {isTable, TableBuilder} from './table'

describe('Table test', (): void => {
    it('Basic properties test', (): void => {
        const column = new ColumnBlockBuilder().name('2018').build()
        const header = new ColumnBlockBuilder()
            .name('header')
            .tree([column])
            .build()
        const expr1 = new SliceExprBuilder().name('hist').expression('').build()
        const expr2 = new SliceExprBuilder().name('proj').expression('').build()
        const row1 = new RowBuilder()
            .name('row')
            .sliceExprs([expr1, expr2])
            .build()
        const t = new TableBuilder()
            .name('example')
            .subnodes([column, row1])
            .referenceHeader(header.uuid)
            .build()
        expect(isTable(t)).toBe(true)
        expect(t.name).toBe('example')
        expect(t.cols[0].name).toBe('2018')
        expect(t.rows[0].name).toBe('row')
        expect(t.nodetype).toEqual(NodeType.TABLE)
        if (!isRow(t.rows[0]))
            return
        expect(t.rows[0].sliceExprs.length).toBe(2)
    })
    it('Insert test', (): void => {
        const c1 = new ColumnBuilder().name('c1').build()
        const c2 = new ColumnBuilder().name('c2').build()
        const c3 = new ColumnBuilder().name('c3').build()
        const r1 = new RowBuilder().name('r1').build()
        const r2 = new RowBuilder().name('r2').build()
        const r3 = new RowBuilder().name('r3').build()
        const header = new ColumnBlockBuilder().name('header').build()
        const table = new TableBuilder()
            .name('table')
            .subnodes([r1, r2, r3, c1, c2, c3])
            .referenceHeader(header.uuid)
            .build()
        expect(table.getLeafRows().map(
            (r: Readonly<Row>): string => r.name,
        )).toEqual(['r1', 'r2', 'r3'])
        expect(table.getLeafCols().map((r: Readonly<Column>): string => r.name))
            .toEqual(['c1', 'c2', 'c3'])
    })
    // tslint:disable-next-line:max-func-body-length
    it('Insert test', (): void => {
        const c1 = new ColumnBlockBuilder().name('c1').build()
        const c2 = new ColumnBlockBuilder().name('c2').build()
        const c3 = new ColumnBlockBuilder().name('c3').build()
        const c4 = new ColumnBlockBuilder().name('c4').build()
        const c5 = new ColumnBlockBuilder().name('c5').build()
        const r1 = new RowBuilder().name('r1').build()
        const r2 = new RowBuilder().name('r2').build()
        const r3 = new RowBuilder().name('r3').build()
        const header = new ColumnBlockBuilder().name('header').build()
        const table = new TableBuilder()
            .referenceHeader(header.uuid)
            .name('table')
            .build()
        table.insertSubnode(c1)
        table.insertSubnode(r1)
        header.insertSubnode(c5)
        expect(table.rows.length).toBe(1)
        expect(table.cols.length).toBe(1)
        expect(header.tree.length).toBe(1)
        table.insertSubnode(r3)
        expect(table.rows.length).toBe(2)
        expect(table.cols.length).toBe(1)
        table.insertSubnode(r2, 1)
        expect(table.rows.length).toBe(3)
        expect(table.cols.length).toBe(1)
        expect(table.rows[0].name).toBe('r1')
        expect(table.rows[1].name).toBe('r2')
        expect(table.rows[2].name).toBe('r3')
        expect(table.referenceHeader).toBeDefined()
        expect(table.cols[0].name).toBe('c1')
        table.insertSubnode(c2, 1)
        expect(table.cols[0].name).toBe('c1')
        expect(table.cols[1].name).toBe('c2')
        table.insertSubnode(c3, 1)
        expect(table.cols[0].name).toBe('c1')
        expect(table.cols[1].name).toBe('c3')
        expect(table.cols[2].name).toBe('c2')
        table.insertSubnode(c4, 3)
        expect(table.cols[0].name).toBe('c1')
        expect(table.cols[1].name).toBe('c3')
        expect(table.cols[2].name).toBe('c2')
        table.deleteSubnode(c4)
        table.insertSubnode(c4, 0)
        expect(table.cols[0].name).toBe('c4')
        expect(table.cols[1].name).toBe('c1')
        expect(table.cols[2].name).toBe('c3')
        expect(table.cols[3].name).toBe('c2')
    })
})