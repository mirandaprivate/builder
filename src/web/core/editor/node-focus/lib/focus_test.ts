import {
    AnnotationKey,
    Row,
    RowBuilder,
    SliceExpr,
    SliceExprBuilder,
    TableBuilder,
} from '@logi/src/lib/hierarchy/core'
import {
    FocusType,
    NodeFocusInfoBuilder,
} from '@logi/src/web/core/editor/node-focus/define'

import {getVerticalFocusInfo, horizontalRightFocus} from './focus'

// tslint:disable-next-line: max-func-body-length
describe('get horizontalRightFocus test', () => {
    let row1: Readonly<Row>
    let row2: Readonly<Row>
    let row3: Readonly<Row>
    let slice31: Readonly<SliceExpr>
    let slice32: Readonly<SliceExpr>
    let slice33: Readonly<SliceExpr>
    let slice34: Readonly<SliceExpr>
    beforeEach(() => {
        row1 = new RowBuilder().name('row1').build()
        row2 = new RowBuilder()
            .name('row2')
            .annotations(getAnnotation())
            .build()
        slice31 = new SliceExprBuilder().name('slice1').build()
        slice32 = new SliceExprBuilder()
            .name('slice2')
            .annotations(getAnnotation())
            .build()
        slice33 = new SliceExprBuilder()
            .name('slice3')
            .annotations(getAnnotation())
            .build()
        slice34 = new SliceExprBuilder().name('slice4').build()
        row3 = new RowBuilder()
            .name('row3')
            .sliceExprs([slice31, slice32, slice33, slice34])
            .build()
        new TableBuilder().name('').subnodes([row1, row2, row3]).build()
    })
    it('from row name to row expression', () => {
        const lastFocus = new NodeFocusInfoBuilder()
            .focusType(FocusType.NAME)
            .nodeId(row1.uuid)
            .build()
        const lastFocusFb = row1
        const target = horizontalRightFocus(lastFocus, lastFocusFb)
        expect(target).toBeDefined()
        const targetInfo = new NodeFocusInfoBuilder()
            .focusType(FocusType.EXPRESSION)
            .nodeId(row1.uuid)
            .build()
        expect(target?.infoEqual(targetInfo)).toBe(true)
    })
    it('from row expression to row name', () => {
        const lastFocus = new NodeFocusInfoBuilder()
            .focusType(FocusType.EXPRESSION)
            .nodeId(row1.uuid)
            .build()
        const lastFocusFb = row1
        const target = horizontalRightFocus(lastFocus, lastFocusFb)
        expect(target).toBeDefined()
        const targetInfo = new NodeFocusInfoBuilder()
            .focusType(FocusType.NAME)
            .nodeId(row1.uuid)
            .build()
        expect(target?.infoEqual(targetInfo)).toBe(true)
    })
    it('can not focus expression from name with link data', () => {
        const lastFocus = new NodeFocusInfoBuilder()
            .focusType(FocusType.NAME)
            .nodeId(row2.uuid)
            .build()
        const lastFocusFb = row2
        const target = horizontalRightFocus(lastFocus, lastFocusFb)
        expect(target).toBeDefined()
        const targetInfo = new NodeFocusInfoBuilder()
            .focusType(FocusType.NAME)
            .nodeId(row2.uuid)
            .build()
        expect(target?.infoEqual(targetInfo)).toBe(true)
    })
    it('focus slice expression from row name', () => {
        const lastFocus = new NodeFocusInfoBuilder()
            .focusType(FocusType.NAME)
            .nodeId(row3.uuid)
            .build()
        const lastFocusFb = row3
        const target = horizontalRightFocus(lastFocus, lastFocusFb)
        expect(target).toBeDefined()
        const targetInfo = new NodeFocusInfoBuilder()
            .focusType(FocusType.EXPRESSION)
            .nodeId(row3.uuid)
            .slice(slice31)
            .build()
        expect(target?.infoEqual(targetInfo)).toBe(true)
    })
    it('jump over slice expression with link data', () => {
        const lastFocus = new NodeFocusInfoBuilder()
            .focusType(FocusType.EXPRESSION)
            .nodeId(row3.uuid)
            .slice(slice31)
            .build()
        const lastFocusFb = row3
        const target = horizontalRightFocus(lastFocus, lastFocusFb)
        expect(target).toBeDefined()
        const targetInfo = new NodeFocusInfoBuilder()
            .focusType(FocusType.EXPRESSION)
            .nodeId(row3.uuid)
            .slice(slice34)
            .build()
        expect(target?.infoEqual(targetInfo)).toBe(true)
    })
    it('focus row name from last slice expression', () => {
        const lastFocus = new NodeFocusInfoBuilder()
            .focusType(FocusType.EXPRESSION)
            .nodeId(row3.uuid)
            .slice(slice34)
            .build()
        const lastFocusFb = row3
        const target = horizontalRightFocus(lastFocus, lastFocusFb)
        expect(target).toBeDefined()
        const targetInfo = new NodeFocusInfoBuilder()
            .focusType(FocusType.NAME)
            .nodeId(row3.uuid)
            .build()
        expect(target?.infoEqual(targetInfo)).toBe(true)
    })
})

// tslint:disable-next-line: max-func-body-length
describe('getVerticalFocusInfo test', () => {
    it('focus row name down', () => {
        const slice11 = new SliceExprBuilder().name('').build()
        const row1 = new RowBuilder().name('').sliceExprs([slice11]).build()
        const slice21 = new SliceExprBuilder().name('').build()
        const row2 = new RowBuilder().name('').sliceExprs([slice21]).build()
        new TableBuilder().name('').subnodes([row1, row2]).build()
        const lastfocus = new NodeFocusInfoBuilder()
            .focusType(FocusType.NAME)
            .nodeId(row1.uuid)
            .build()
        const target = getVerticalFocusInfo(lastfocus, row1, false)
        const expectedTarget = new NodeFocusInfoBuilder()
            .focusType(FocusType.NAME)
            .nodeId(row2.uuid)
            .build()
        expect(target.infoEqual(expectedTarget)).toBe(true)
    })
    it('focus row name up', () => {
        const slice11 = new SliceExprBuilder().name('').build()
        const row1 = new RowBuilder().name('').sliceExprs([slice11]).build()
        const slice21 = new SliceExprBuilder().name('').build()
        const row2 = new RowBuilder().name('').sliceExprs([slice21]).build()
        new TableBuilder().name('').subnodes([row1, row2]).build()
        const lastfocus = new NodeFocusInfoBuilder()
            .focusType(FocusType.NAME)
            .nodeId(row2.uuid)
            .build()
        const target = getVerticalFocusInfo(lastfocus, row2, true)
        const expectedTarget = new NodeFocusInfoBuilder()
            .focusType(FocusType.NAME)
            .nodeId(row1.uuid)
            .build()
        expect(target.infoEqual(expectedTarget)).toBe(true)
    })
    it('focus row expression down', () => {
        const row1 = new RowBuilder().name('').build()
        const row2 = new RowBuilder().name('').build()
        new TableBuilder().name('').subnodes([row1, row2]).build()
        const lastfocus = new NodeFocusInfoBuilder()
            .focusType(FocusType.EXPRESSION)
            .nodeId(row1.uuid)
            .build()
        const target = getVerticalFocusInfo(lastfocus, row1, false)
        const expectedTarget = new NodeFocusInfoBuilder()
            .focusType(FocusType.EXPRESSION)
            .nodeId(row2.uuid)
            .build()
        expect(target.infoEqual(expectedTarget)).toBe(true)
    })
    it('focus row expression up', () => {
        const row1 = new RowBuilder().name('').build()
        const row2 = new RowBuilder().name('').build()
        new TableBuilder().name('').subnodes([row1, row2]).build()
        const lastfocus = new NodeFocusInfoBuilder()
            .focusType(FocusType.EXPRESSION)
            .nodeId(row2.uuid)
            .build()
        const target = getVerticalFocusInfo(lastfocus, row1, true)
        const expectedTarget = new NodeFocusInfoBuilder()
            .focusType(FocusType.EXPRESSION)
            .nodeId(row1.uuid)
            .build()
        expect(target.infoEqual(expectedTarget)).toBe(true)
    })
    it('jump over link data down', () => {
        const row1 = new RowBuilder().name('').build()
        const row2 = new RowBuilder()
            .name('')
            .annotations(getAnnotation())
            .build()
        const row3 = new RowBuilder().name('').build()
        new TableBuilder().name('').subnodes([row1, row2, row3]).build()
        const lastfocus = new NodeFocusInfoBuilder()
            .focusType(FocusType.EXPRESSION)
            .nodeId(row1.uuid)
            .build()
        const target = getVerticalFocusInfo(lastfocus, row1, false)
        const expectedTarget = new NodeFocusInfoBuilder()
            .focusType(FocusType.EXPRESSION)
            .nodeId(row3.uuid)
            .build()
        expect(target.infoEqual(expectedTarget)).toBe(true)
    })
    it('jump over link data up', () => {
        const row1 = new RowBuilder().name('').build()
        const row2 = new RowBuilder()
            .name('')
            .annotations(getAnnotation())
            .build()
        const row3 = new RowBuilder().name('').build()
        new TableBuilder().name('').subnodes([row1, row2, row3]).build()
        const lastfocus = new NodeFocusInfoBuilder()
            .focusType(FocusType.EXPRESSION)
            .nodeId(row3.uuid)
            .build()
        const target = getVerticalFocusInfo(lastfocus, row1, true)
        const expectedTarget = new NodeFocusInfoBuilder()
            .focusType(FocusType.EXPRESSION)
            .nodeId(row1.uuid)
            .build()
        expect(target.infoEqual(expectedTarget)).toBe(true)
    })
    it('focus next slice expression from last row expression down', () => {
        const row1 = new RowBuilder().name('').build()
        const row2 = new RowBuilder()
            .name('')
            .sliceExprs([new SliceExprBuilder().name('').build()])
            .build()
        new TableBuilder().name('').subnodes([row1, row2]).build()
        const lastfocus = new NodeFocusInfoBuilder()
            .focusType(FocusType.EXPRESSION)
            .nodeId(row1.uuid)
            .build()
        const target = getVerticalFocusInfo(lastfocus, row1, false)
        const expectedTarget = new NodeFocusInfoBuilder()
            .focusType(FocusType.EXPRESSION)
            .nodeId(row2.uuid)
            .slice(row2.sliceExprs[0])
            .build()
        expect(target.infoEqual(expectedTarget)).toBe(true)
    })
    it('focus last slice expression from row expression up', () => {
        const row1 = new RowBuilder()
            .name('')
            .sliceExprs([new SliceExprBuilder().name('').build()])
            .build()
        const row2 = new RowBuilder().name('').build()
        new TableBuilder().name('').subnodes([row1, row2]).build()
        const lastfocus = new NodeFocusInfoBuilder()
            .focusType(FocusType.EXPRESSION)
            .nodeId(row2.uuid)
            .build()
        const target = getVerticalFocusInfo(lastfocus, row1, true)
        const expectedTarget = new NodeFocusInfoBuilder()
            .focusType(FocusType.EXPRESSION)
            .nodeId(row1.uuid)
            .slice(row1.sliceExprs[0])
            .build()
        expect(target.infoEqual(expectedTarget)).toBe(true)
    })
})

function getAnnotation(): Map<AnnotationKey, string> {
    const map1 = new Map()
    map1.set(AnnotationKey.LINK_CODE, 'code')
    map1.set(AnnotationKey.LINK_NAME, 'name')
    return map1
}
