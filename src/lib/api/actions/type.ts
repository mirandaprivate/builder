export const enum ActionType {
    UNDEFINED = 0,
    CUSTOM,
    // EditorActioin
    CLOSE_MODEL,
    LOAD_FILE,
    LOAD_JSON,
    NEW_BOOK,
    LOAD_MODEL,
    ADD_MODEL,
    SIMPLE_LOAD,
    LOAD_TBR_WORKBOOK,
    // HierarchyAction
    ADD_CHILD,
    ADD_FORMULAS,
    ADD_SEPARATOR,
    ADD_SHEET,
    ADD_SUM_SNIPPET,
    BATCH_SET_TYPE,
    CLONE_SHEET,
    DEFINED,
    LEVEL_CHANGE,
    MOVE,
    MOVE_SHEET,
    MOVE_VERTICALLY,
    PASTE,
    PREDICT_BASE_HIST_AVERAGE,
    PREDICT_FROM_LAST_YEAR,
    REMOVE_DB_DATA,
    REMOVE_NODES,
    REMOVE_REDUNDANT_ALIAS,
    REMOVE_SHEET,
    REMOVE_SLICE_DB_DATA,
    SET_ALIAS,
    SET_EXCEL_VALUE,
    SET_EXPRESSION,
    SET_HEADER_STUB,
    SET_KEY_ASSUMPTION,
    SET_NAME,
    SET_REF_HEADER,
    SET_DATA_TYPE,
    SET_TYPE,
    UNLINK,
    // Label
    ADD_LABEL,
    MODIFY_LABEL,
    REMOVE_LABEL,
    RENAME_LABEL,
    // Slice
    ADD_SLICE,
    BATCH_ADD_SLICES,
    MOVE_VERTICALLY_SLICE,
    PASTE_SLICE,
    REMOVE_ALL_SLICES,
    REMOVE_SLICE,
    SET_EXPR_SLICE,
    SET_NAME_SLICE,
    SET_TYPE_SLICE,
    // RenameBar
    // Source
    CLEAR_DATA,
    CLEAR_PLAYGROUND,
    CONFIRM_PLAYGROUND,
    LOAD_EXCEL,
    RESET_PLAYGROUND_SOURCE,
    SET_FORMULA,
    SET_PLAYGROUND_SOURCE,
    SET_SOURCE,
    // Status
    SET_ACTIVE_SHEET,
    SET_CLIPBOARD,
    SET_DEFAULT_HEADER,
    // Template
    ADD_STD_HEADER,
    ADD_TEMPLATE,
    REMOVE_STD_HEADER,
    RENAME_STD_HEADER,
    UPDATE_STD_HEADER,
    UNDO,
    REDO,
    DOWNLOAD,
    RENDER,
    MULTI_WINDOW,
    UPLOAD,
    GROWTH_RATE,
    ITEMIZED_FORECAST,
    BASE_HISTORICAL_FORECAST,
    // Modifier action
    SET_BOLD,
    SET_CURRENCY,
    SET_DECIMAL_PLACES,
    SET_FAMILY,
    SET_INDENT_DELTA,
    SET_ITALIC,
    SET_LINE,
    SET_PERCENT,
    SET_SIZE,
    SET_THOUSANDS_SEPARATOR,
    CUSTOM_SHEET,
}
