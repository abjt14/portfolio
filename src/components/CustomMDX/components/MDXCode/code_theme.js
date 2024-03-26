export const code_theme_dark = {
  name: "Lambda Studio — Blackout",
  semanticHighlighting: true,
  colors: {
    "editorLink.activeForeground": "#ca8a0488",
    foreground: "#fff8",
    "button.background": "#fff",
    "button.foreground": "#000",
    "button.hoverBackground": "#fffb",
    "list.highlightForeground": "#fff",
    "textLink.foreground": "#fff",
    "scrollbar.shadow": "#000",
    "textLink.activeForeground": "#fff8",
    "editor.lineHighlightBackground": "#8881",
    "editor.lineHighlightBorder": "#8882",
    "editorCursor.foreground": "#fff",
    "editor.findMatchBackground": "#fff8",
    "editor.findMatchHighlightBackground": "#fff2",
    "list.activeSelectionForeground": "#fff",
    "list.focusForeground": "#fff",
    "list.hoverForeground": "#fff",
    "list.inactiveSelectionForeground": "#fff",
    "list.inactiveSelectionBackground": "#000",
    "list.focusBackground": "#000",
    "list.focusAndSelectionOutline": "#000",
    "list.focusHighlightForeground": "#fff",
    "list.hoverBackground": "#000",
    "list.focusOutline": "#000",
    "list.activeSelectionBackground": "#000",
    "editorIndentGuide.background": "#fff2",
    "editor.background": "#000",
    "editor.foreground": "#fff",
    "editor.foldBackground": "#000",
    "editor.hoverHighlightBackground": "#000",
    "editor.selectionBackground": "#8888",
    "editor.inactiveSelectionBackground": "#8882",
    "gitDecoration.modifiedResourceForeground": "#fff",
    "gitDecoration.untrackedResourceForeground": "#a7cb7b",
    "gitDecoration.conflictingResourceForeground": "#ca8a04",
    "gitDecoration.deletedResourceForeground": "#c97b89",
    "listFilterWidget.background": "#000",
    "input.background": "#fff1",
    "titleBar.activeForeground": "#fff",
    "editorWidget.background": "#000",
    "editorGutter.background": "#000",
    "debugToolBar.background": "#000",
    "commandCenter.background": "#000",
    "sideBarSectionHeader.background": "#000",
    focusBorder: "#fff8",
    "titleBar.activeBackground": "#000",
    "titleBar.inactiveBackground": "#000",
    "breadcrumb.background": "#000",
    "activityBar.background": "#000",
    "activityBar.foreground": "#fff8",
    "panel.background": "#000",
    "sideBar.background": "#000",
    "sideBarTitle.foreground": "#fff8",
    "tab.hoverBackground": "#000",
    "terminal.background": "#000",
    "statusBar.background": "#000",
    "statusBar.foreground": "#fff8",
    "selection.background": "#fff2",
    "editorPane.background": "#000",
    "badge.background": "#000",
    "banner.background": "#000",
    "menu.background": "#000",
    "activityBarBadge.background": "#000",
    "activityBarBadge.foreground": "#fff8",
    "editorLineNumber.foreground": "#fff2",
    "editorLineNumber.activeForeground": "#fff8",
    "statusBarItem.errorBackground": "#f43f5e",
  },
  semanticTokenColors: {
    comment: {
      foreground: "#fff4",
    },
    keyword: {
      foreground: "#fff8",
    },
    string: {
      foreground: "#fff8",
    },
    selfKeyword: {
      foreground: "#fff",
      bold: true,
    },
    "method.declaration": {
      foreground: "#fff",
      bold: true,
    },
    "method.definition": {
      foreground: "#fff",
      bold: true,
    },
    method: {
      foreground: "#fff",
      bold: false,
    },
    "function.declaration": {
      foreground: "#fff",
      bold: true,
    },
    "function.definition": {
      foreground: "#fff",
      bold: true,
    },
    function: {
      foreground: "#fff",
      bold: false,
    },
    property: {
      foreground: "#fff",
    },
    enumMember: {
      foreground: "#fff8",
      bold: false,
    },
    enum: {
      foreground: "#fff",
      bold: true,
    },
    boolean: {
      foreground: "#fff8",
    },
    number: {
      foreground: "#fff8",
    },
    type: {
      foreground: "#fff",
      bold: true,
    },
    typeAlias: {
      foreground: "#fff",
      bold: true,
    },
    class: {
      foreground: "#fff",
      bold: true,
    },
    selfTypeKeyword: {
      foreground: "#fff",
      bold: true,
    },
    builtinType: {
      foreground: "#fff",
      bold: true,
    },
    interface: {
      foreground: "#fff8",
      bold: false,
    },
    typeParameter: {
      foreground: "#fff",
      bold: true,
    },
    lifetime: {
      foreground: "#fff8",
      italic: false,
      bold: false,
    },
    namespace: {
      foreground: "#fff",
    },
    macro: {
      foreground: "#fff",
      bold: false,
    },
    decorator: {
      foreground: "#fff",
      bold: false,
    },
    builtinAttribute: {
      foreground: "#fff",
      bold: false,
    },
    "generic.attribute": {
      foreground: "#fff",
    },
    derive: {
      foreground: "#fff",
    },
    operator: {
      foreground: "#fff8",
    },
    variable: {
      foreground: "#fff",
    },
    "variable.readonly": {
      foreground: "#fff8",
    },
    parameter: {
      foreground: "#fff",
    },
    "variable.mutable": {
      underline: true,
    },
    "parameter.mutable": {
      underline: true,
    },
    "selfKeyword.mutable": {
      underline: true,
    },
    "variable.constant": {
      foreground: "#fff8",
    },
    struct: {
      foreground: "#fff",
      bold: true,
    },
  },
  tokenColors: [
    {
      name: "Fallback Operator",
      scope: ["keyword.operator"],
      settings: {
        foreground: "#fff8",
      },
    },
    {
      name: "Fallback keywords",
      scope: [
        "storage.type.ts",
        "keyword",
        "keyword.other",
        "keyword.control",
        "storage.type",
        "storage.modifier",
      ],
      settings: {
        foreground: "#fff8",
      },
    },
    {
      name: "Fallback strings",
      scope: ["string"],
      settings: {
        foreground: "#fff8",
      },
    },
    {
      name: "Fallback JSON Properties",
      scope: ["support.type.property-name.json"],
      settings: {
        foreground: "#fff",
      },
    },
    {
      name: "Fallback string variables",
      scope: ["string variable", "string meta.interpolation"],
      settings: {
        foreground: "#fff",
      },
    },
    {
      name: "Fallback comments",
      scope: ["comment"],
      settings: {
        foreground: "#fff4",
      },
    },
    {
      name: "Fallback constants",
      scope: ["constant"],
      settings: {
        foreground: "#fff8",
      },
    },
    {
      name: "Fallback self/this",
      scope: ["variable.language.this"],
      settings: {
        foreground: "#fff",
      },
    },
    {
      name: "Fallback types",
      scope: [
        "entity.other.alias",
        "source.php support.class",
        "entity.name.type",
        "meta.function-call support.class",
        "keyword.other.type",
        "entity.other.inherited-class",
      ],
      settings: {
        foreground: "#fff",
        fontStyle: "bold",
      },
    },
    {
      name: "Fallback method calls",
      scope: ["meta.method-call entity.name.function"],
      settings: {
        foreground: "#fff",
        fontStyle: "",
      },
    },
    {
      name: "Fallback function calls",
      scope: [
        "meta.function-call entity.name.function",
        "meta.function-call support.function",
        "meta.function.call entity.name.function",
      ],
      settings: {
        foreground: "#fff",
        fontStyle: "",
      },
    },
    {
      name: "Fallback enums & constants",
      scope: ["constant.enum", "constant.other"],
      settings: {
        foreground: "#fff8",
      },
    },
    {
      name: "Fallback Properties & func arguments",
      scope: [
        "variable.other.property",
        "entity.name.goto-label",
        "entity.name.variable.parameter",
      ],
      settings: {
        foreground: "#fff",
      },
    },
    {
      name: "Fallback functions & methods declarations",
      scope: [
        "entity.name.function",
        "support.function",
        "support.function.constructor",
        "entity.name.function meta.function-call meta.method-call",
      ],
      settings: {
        foreground: "#fff",
        fontStyle: "bold",
      },
    },
    {
      name: "HTML Tags",
      scope: ["meta.tag entity.name.tag.html", "entity.name.tag.template.html"],
      settings: {
        foreground: "#fff",
      },
    },
    {
      name: "HTML Attributes",
      scope: ["entity.other.attribute-name.html"],
      settings: {
        foreground: "#fff8",
      },
    },
    {
      name: "HTML Custom Tag",
      scope: ["meta.tag.other.unrecognized.html entity.name.tag.html"],
      settings: {
        foreground: "#fff",
      },
    },
    {
      name: "HTML Keywords",
      scope: ["text.html keyword"],
      settings: {
        foreground: "#fff",
      },
    },
    {
      name: "Punctuations",
      scope: ["punctuation", "meta.brace"],
      settings: {
        foreground: "#fff8",
      },
    },
  ],
};

export const code_theme_light = {
  name: "Lambda Studio — Whiteout",
  semanticHighlighting: true,
  colors: {
    "editorLink.activeForeground": "#ca8a0488",
    foreground: "#0008",
    "button.background": "#000",
    "button.foreground": "#fff",
    "button.hoverBackground": "#000b",
    "list.highlightForeground": "#000",
    "textLink.foreground": "#000",
    "scrollbar.shadow": "#fff",
    "textLink.activeForeground": "#0008",
    "editor.lineHighlightBackground": "#8881",
    "editor.lineHighlightBorder": "#8882",
    "editorCursor.foreground": "#000",
    "editor.findMatchBackground": "#0008",
    "editor.findMatchHighlightBackground": "#0002",
    "list.activeSelectionForeground": "#000",
    "list.focusForeground": "#000",
    "list.hoverForeground": "#000",
    "list.inactiveSelectionForeground": "#000",
    "list.inactiveSelectionBackground": "#fff",
    "list.focusBackground": "#fff",
    "list.focusAndSelectionOutline": "#fff",
    "list.focusHighlightForeground": "#000",
    "list.hoverBackground": "#fff",
    "list.focusOutline": "#fff",
    "list.activeSelectionBackground": "#fff",
    "editorIndentGuide.background": "#0002",
    "editor.background": "#fff",
    "editor.foreground": "#000",
    "editor.foldBackground": "#fff",
    "editor.hoverHighlightBackground": "#fff",
    "editor.selectionBackground": "#8888",
    "editor.inactiveSelectionBackground": "#8882",
    "gitDecoration.modifiedResourceForeground": "#000",
    "gitDecoration.untrackedResourceForeground": "#a7cb7b",
    "gitDecoration.conflictingResourceForeground": "#ca8a04",
    "gitDecoration.deletedResourceForeground": "#c97b89",
    "listFilterWidget.background": "#fff",
    "input.background": "#0001",
    "titleBar.activeForeground": "#000",
    "editorWidget.background": "#fff",
    "editorGutter.background": "#fff",
    "debugToolBar.background": "#fff",
    "commandCenter.background": "#fff",
    "sideBarSectionHeader.background": "#fff",
    focusBorder: "#0008",
    "titleBar.activeBackground": "#fff",
    "titleBar.inactiveBackground": "#fff",
    "breadcrumb.background": "#fff",
    "activityBar.background": "#fff",
    "activityBar.foreground": "#0008",
    "panel.background": "#fff",
    "sideBar.background": "#fff",
    "sideBarTitle.foreground": "#0008",
    "tab.hoverBackground": "#fff",
    "terminal.background": "#fff",
    "statusBar.background": "#fff",
    "statusBar.foreground": "#0008",
    "selection.background": "#0002",
    "editorPane.background": "#fff",
    "badge.background": "#fff",
    "banner.background": "#fff",
    "menu.background": "#fff",
    "activityBarBadge.background": "#fff",
    "activityBarBadge.foreground": "#0008",
    "editorLineNumber.foreground": "#0002",
    "editorLineNumber.activeForeground": "#0008",
    "statusBarItem.errorBackground": "#f43f5e",
  },
  semanticTokenColors: {
    comment: {
      foreground: "#0004",
    },
    keyword: {
      foreground: "#0008",
    },
    string: {
      foreground: "#0008",
    },
    selfKeyword: {
      foreground: "#000",
      bold: true,
    },
    "method.declaration": {
      foreground: "#000",
      bold: true,
    },
    "method.definition": {
      foreground: "#000",
      bold: true,
    },
    method: {
      foreground: "#000",
      bold: false,
    },
    "function.declaration": {
      foreground: "#000",
      bold: true,
    },
    "function.definition": {
      foreground: "#000",
      bold: true,
    },
    function: {
      foreground: "#000",
      bold: false,
    },
    property: {
      foreground: "#000",
    },
    enumMember: {
      foreground: "#0008",
      bold: false,
    },
    enum: {
      foreground: "#000",
      bold: true,
    },
    boolean: {
      foreground: "#0008",
    },
    number: {
      foreground: "#0008",
    },
    type: {
      foreground: "#000",
      bold: true,
    },
    typeAlias: {
      foreground: "#000",
      bold: true,
    },
    class: {
      foreground: "#000",
      bold: true,
    },
    selfTypeKeyword: {
      foreground: "#000",
      bold: true,
    },
    builtinType: {
      foreground: "#000",
      bold: true,
    },
    interface: {
      foreground: "#0008",
      bold: false,
    },
    typeParameter: {
      foreground: "#000",
      bold: true,
    },
    lifetime: {
      foreground: "#0008",
      italic: false,
      bold: false,
    },
    namespace: {
      foreground: "#000",
    },
    macro: {
      foreground: "#000",
      bold: false,
    },
    decorator: {
      foreground: "#000",
      bold: false,
    },
    builtinAttribute: {
      foreground: "#000",
      bold: false,
    },
    "generic.attribute": {
      foreground: "#000",
    },
    derive: {
      foreground: "#000",
    },
    operator: {
      foreground: "#0008",
    },
    variable: {
      foreground: "#000",
    },
    "variable.readonly": {
      foreground: "#0008",
    },
    parameter: {
      foreground: "#000",
    },
    "variable.mutable": {
      underline: true,
    },
    "parameter.mutable": {
      underline: true,
    },
    "selfKeyword.mutable": {
      underline: true,
    },
    "variable.constant": {
      foreground: "#0008",
    },
    struct: {
      foreground: "#000",
      bold: true,
    },
  },
  tokenColors: [
    {
      name: "Fallback Operator",
      scope: ["keyword.operator"],
      settings: {
        foreground: "#0008",
      },
    },
    {
      name: "Fallback keywords",
      scope: [
        "storage.type.ts",
        "keyword",
        "keyword.other",
        "keyword.control",
        "storage.type",
        "storage.modifier",
      ],
      settings: {
        foreground: "#0008",
      },
    },
    {
      name: "Fallback strings",
      scope: ["string"],
      settings: {
        foreground: "#0008",
      },
    },
    {
      name: "Fallback JSON Properties",
      scope: ["support.type.property-name.json"],
      settings: {
        foreground: "#000",
      },
    },
    {
      name: "Fallback string variables",
      scope: ["string variable", "string meta.interpolation"],
      settings: {
        foreground: "#000",
      },
    },
    {
      name: "Fallback comments",
      scope: ["comment"],
      settings: {
        foreground: "#0004",
      },
    },
    {
      name: "Fallback constants",
      scope: ["constant"],
      settings: {
        foreground: "#0008",
      },
    },
    {
      name: "Fallback self/this",
      scope: ["variable.language.this"],
      settings: {
        foreground: "#000",
      },
    },
    {
      name: "Fallback types",
      scope: [
        "entity.other.alias",
        "source.php support.class",
        "entity.name.type",
        "meta.function-call support.class",
        "keyword.other.type",
        "entity.other.inherited-class",
      ],
      settings: {
        foreground: "#000",
        fontStyle: "bold",
      },
    },
    {
      name: "Fallback method calls",
      scope: ["meta.method-call entity.name.function"],
      settings: {
        foreground: "#000",
        fontStyle: "",
      },
    },
    {
      name: "Fallback function calls",
      scope: [
        "meta.function-call entity.name.function",
        "meta.function-call support.function",
        "meta.function.call entity.name.function",
      ],
      settings: {
        foreground: "#000",
        fontStyle: "",
      },
    },
    {
      name: "Fallback enums & constants",
      scope: ["constant.enum", "constant.other"],
      settings: {
        foreground: "#0008",
      },
    },
    {
      name: "Fallback Properties & func arguments",
      scope: [
        "variable.other.property",
        "entity.name.goto-label",
        "entity.name.variable.parameter",
      ],
      settings: {
        foreground: "#000",
      },
    },
    {
      name: "Fallback functions & methods declarations",
      scope: [
        "entity.name.function",
        "support.function",
        "support.function.constructor",
        "entity.name.function meta.function-call meta.method-call",
      ],
      settings: {
        foreground: "#000",
        fontStyle: "bold",
      },
    },
    {
      name: "HTML Tags",
      scope: ["meta.tag entity.name.tag.html", "entity.name.tag.template.html"],
      settings: {
        foreground: "#000",
      },
    },
    {
      name: "HTML Attributes",
      scope: ["entity.other.attribute-name.html"],
      settings: {
        foreground: "#0008",
      },
    },
    {
      name: "HTML Custom Tag",
      scope: ["meta.tag.other.unrecognized.html entity.name.tag.html"],
      settings: {
        foreground: "#000",
      },
    },
    {
      name: "HTML Keywords",
      scope: ["text.html keyword"],
      settings: {
        foreground: "#000",
      },
    },
    {
      name: "Punctuations",
      scope: ["punctuation", "meta.brace"],
      settings: {
        foreground: "#0008",
      },
    },
  ],
};
