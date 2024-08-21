"use strict";(self.webpackChunkchisel_lang=self.webpackChunkchisel_lang||[]).push([[4020],{1360:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>l,default:()=>h,frontMatter:()=>i,metadata:()=>o,toc:()=>r});var s=t(4848),a=t(8453);const i={layout:"docs",title:"Chisel Data Types",section:"chisel3"},l="Chisel Data Types",o={id:"explanations/data-types",title:"Chisel Data Types",description:"Chisel datatypes are used to specify the type of values held in state",source:"@site/docs/explanations/data-types.md",sourceDirName:"explanations",slug:"/explanations/data-types",permalink:"/docs/explanations/data-types",draft:!1,unlisted:!1,editUrl:"https://github.com/chipsalliance/chisel/tree/main/docs/src/explanations/data-types.md",tags:[],version:"current",frontMatter:{layout:"docs",title:"Chisel Data Types",section:"chisel3"},sidebar:"chiselSidebar",previous:{title:"Deep Dive into <> and := Connection Operators",permalink:"/docs/explanations/connection-operators"},next:{title:"DataView",permalink:"/docs/explanations/dataview"}},c={},r=[{value:"Casting",id:"casting",level:2},{value:"Analog/BlackBox type",id:"analogblackbox-type",level:2}];function d(e){const n={blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",header:"header",p:"p",pre:"pre",strong:"strong",...(0,a.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.header,{children:(0,s.jsx)(n.h1,{id:"chisel-data-types",children:"Chisel Data Types"})}),"\n",(0,s.jsxs)(n.p,{children:["Chisel datatypes are used to specify the type of values held in state\nelements or flowing on wires.  While hardware designs ultimately\noperate on vectors of binary digits, other more abstract\nrepresentations for values allow clearer specifications and help the\ntools generate more optimal circuits.  In Chisel, a raw collection of\nbits is represented by the ",(0,s.jsx)(n.code,{children:"Bits"})," type.  Signed and unsigned integers\nare considered subsets of fixed-point numbers and are represented by\ntypes ",(0,s.jsx)(n.code,{children:"SInt"})," and ",(0,s.jsx)(n.code,{children:"UInt"})," respectively. Signed fixed-point\nnumbers, including integers, are represented using two's-complement\nformat.  Boolean values are represented as type ",(0,s.jsx)(n.code,{children:"Bool"}),".  Note\nthat these types are distinct from Scala's builtin types such as\n",(0,s.jsx)(n.code,{children:"Int"})," or ",(0,s.jsx)(n.code,{children:"Boolean"}),"."]}),"\n",(0,s.jsxs)(n.p,{children:["Additionally, Chisel defines ",(0,s.jsx)(n.code,{children:"Bundles"})," for making\ncollections of values with named fields (similar to ",(0,s.jsx)(n.code,{children:"structs"})," in\nother languages), and ",(0,s.jsx)(n.code,{children:"Vecs"})," for indexable collections of\nvalues."]}),"\n",(0,s.jsx)(n.p,{children:"Bundles and Vecs will be covered in the next section."}),"\n",(0,s.jsx)(n.p,{children:"Constant or literal values are expressed using Scala integers or\nstrings passed to constructors for the types:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-scala",children:'1.U       // decimal 1-bit lit from Scala Int.\n"ha".U    // hexadecimal 4-bit lit from string.\n"o12".U   // octal 4-bit lit from string.\n"b1010".U // binary 4-bit lit from string.\n\n5.S    // signed decimal 4-bit lit from Scala Int.\n-8.S   // negative decimal 4-bit lit from Scala Int.\n5.U    // unsigned decimal 3-bit lit from Scala Int.\n\n8.U(4.W) // 4-bit unsigned decimal, value 8.\n-152.S(32.W) // 32-bit signed decimal, value -152.\n\ntrue.B // Bool lits from Scala lits.\nfalse.B\n'})}),"\n",(0,s.jsx)(n.p,{children:"Underscores can be used as separators in long string literals to aid\nreadability, but are ignored when creating the value, e.g.:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-scala",children:'"h_dead_beef".U   // 32-bit lit of type UInt\n'})}),"\n",(0,s.jsxs)(n.p,{children:["By default, the Chisel compiler will size each constant to the minimum\nnumber of bits required to hold the constant, including a sign bit for\nsigned types. Bit widths can also be specified explicitly on\nliterals, as shown below. Note that (",(0,s.jsx)(n.code,{children:".W"})," is used to cast a Scala Int\nto a Chisel width)"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-scala",children:'"ha".asUInt(8.W)     // hexadecimal 8-bit lit of type UInt\n"o12".asUInt(6.W)    // octal 6-bit lit of type UInt\n"b1010".asUInt(12.W) // binary 12-bit lit of type UInt\n\n5.asSInt(7.W) // signed decimal 7-bit lit of type SInt\n5.asUInt(8.W) // unsigned decimal 8-bit lit of type UInt\n'})}),"\n",(0,s.jsxs)(n.p,{children:["For literals of type ",(0,s.jsx)(n.code,{children:"UInt"}),", the value is\nzero-extended to the desired bit width.  For literals of type\n",(0,s.jsx)(n.code,{children:"SInt"}),", the value is sign-extended to fill the desired bit width.\nIf the given bit width is too small to hold the argument value, then a\nChisel error is generated."]}),"\n",(0,s.jsxs)(n.blockquote,{children:["\n",(0,s.jsx)(n.p,{children:"We are working on a more concise literal syntax for Chisel using\nsymbolic prefix operators, but are stymied by the limitations of Scala\noperator overloading and have not yet settled on a syntax that is\nactually more readable than constructors taking strings."}),"\n"]}),"\n",(0,s.jsxs)(n.blockquote,{children:["\n",(0,s.jsx)(n.p,{children:"We have also considered allowing Scala literals to be automatically\nconverted to Chisel types, but this can cause type ambiguity and\nrequires an additional import."}),"\n"]}),"\n",(0,s.jsxs)(n.blockquote,{children:["\n",(0,s.jsx)(n.p,{children:"The SInt and UInt types will also later support an optional exponent\nfield to allow Chisel to automatically produce optimized fixed-point\narithmetic circuits."}),"\n"]}),"\n",(0,s.jsx)(n.h2,{id:"casting",children:"Casting"}),"\n",(0,s.jsx)(n.p,{children:"We can also cast types in Chisel:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-scala",children:"val sint = 3.S(4.W)             // 4-bit SInt\n\nval uint = sint.asUInt          // cast SInt to UInt\nuint.asSInt                     // cast UInt to SInt\n"})}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"NOTE"}),": ",(0,s.jsx)(n.code,{children:"asUInt"}),"/",(0,s.jsx)(n.code,{children:"asSInt"})," with an explicit width can ",(0,s.jsx)(n.strong,{children:"not"})," be used to cast (convert) between Chisel datatypes.\nNo width parameter is accepted, as Chisel will automatically pad or truncate as required when the objects are connected."]}),"\n",(0,s.jsx)(n.p,{children:"We can also perform casts on clocks, though you should be careful about this, since clocking (especially in ASIC) requires special attention:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-scala",children:"val bool: Bool = false.B        // always-low wire\nval clock = bool.asClock        // always-low clock\n\nclock.asUInt                    // convert clock to UInt (width 1)\nclock.asUInt.asBool             // convert clock to Bool (Chisel 3.2+)\nclock.asUInt.toBool             // convert clock to Bool (Chisel 3.0 and 3.1 only)\n"})}),"\n",(0,s.jsx)(n.h2,{id:"analogblackbox-type",children:"Analog/BlackBox type"}),"\n",(0,s.jsx)(n.p,{children:"(Experimental, Chisel 3.1+)"}),"\n",(0,s.jsxs)(n.p,{children:["Chisel supports an ",(0,s.jsx)(n.code,{children:"Analog"})," type (equivalent to Verilog ",(0,s.jsx)(n.code,{children:"inout"}),") that can be used to support arbitrary nets in Chisel. This includes analog wires, tri-state/bi-directional wires, and power nets (with appropriate annotations)."]}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"Analog"})," is an undirectioned type, and so it is possible to connect multiple ",(0,s.jsx)(n.code,{children:"Analog"})," nets together using the ",(0,s.jsx)(n.code,{children:"attach"})," operator. It is possible to connect an ",(0,s.jsx)(n.code,{children:"Analog"})," ",(0,s.jsx)(n.strong,{children:"once"})," using ",(0,s.jsx)(n.code,{children:"<>"})," but illegal to do it more than once."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-scala",children:"val a = IO(Analog(1.W))\nval b = IO(Analog(1.W))\nval c = IO(Analog(1.W))\n\n// Legal\nattach(a, b)\nattach(a, c)\n\n// Legal\na <> b\n\n// Illegal - connects 'a' multiple times\na <> b\na <> c\n"})})]})}function h(e={}){const{wrapper:n}={...(0,a.R)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(d,{...e})}):d(e)}},8453:(e,n,t)=>{t.d(n,{R:()=>l,x:()=>o});var s=t(6540);const a={},i=s.createContext(a);function l(e){const n=s.useContext(i);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:l(e.components),s.createElement(i.Provider,{value:n},e.children)}}}]);