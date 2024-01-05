"use strict";(self.webpackChunkchisel_lang=self.webpackChunkchisel_lang||[]).push([[2705],{4564:(n,e,o)=>{o.r(e),o.d(e,{assets:()=>r,contentTitle:()=>c,default:()=>p,frontMatter:()=>a,metadata:()=>s,toc:()=>l});var i=o(5893),t=o(1151);const a={layout:"docs",title:"Deep Dive into <> and := Connection Operators",section:"chisel3"},c="Deep Dive into Connection Operators",s={id:"explanations/connection-operators",title:"Deep Dive into <> and := Connection Operators",description:"Chisel contains two connection operators, := and `. This document provides a deeper explanation of the differences of the two and when to use one or the other. The differences are demonstrated with experiments using Scastie examples which use DecoupledIO`.",source:"@site/docs/explanations/connection-operators.md",sourceDirName:"explanations",slug:"/explanations/connection-operators",permalink:"/docs/explanations/connection-operators",draft:!1,unlisted:!1,editUrl:"https://github.com/chipsalliance/chisel/tree/main/docs/src/explanations/connection-operators.md",tags:[],version:"current",frontMatter:{layout:"docs",title:"Deep Dive into <> and := Connection Operators",section:"chisel3"},sidebar:"tutorialSidebar",previous:{title:"Connectable Operators",permalink:"/docs/explanations/connectable"},next:{title:"Chisel Data Types",permalink:"/docs/explanations/data-types"}},r={},l=[{value:"Experiment Setup",id:"experiment-setup",level:3},{value:"Concept 1: <code>&lt;&gt;</code> is Commutative",id:"concept-1--is-commutative",level:2},{value:"Conclusion:",id:"conclusion",level:3},{value:"Concept 2: <code>:=</code> means assign ALL LHS signals from the RHS, regardless of the direction on the LHS.",id:"concept-2--means-assign-all-lhs-signals-from-the-rhs-regardless-of-the-direction-on-the-lhs",level:2},{value:"Conclusion:",id:"conclusion-1",level:3},{value:"Concept 3: Always Use <code>:=</code> to assign DontCare to Wires",id:"concept-3-always-use--to-assign-dontcare-to-wires",level:2},{value:"Conclusion:",id:"conclusion-2",level:3},{value:"Concept 4: You can use <code>&lt;&gt;</code> or <code>:=</code> to assign <code>DontCare</code> to directioned things (IOs)",id:"concept-4-you-can-use--or--to-assign-dontcare-to-directioned-things-ios",level:2},{value:"Conclusion:",id:"conclusion-3",level:3},{value:"Concept 5: <code>&lt;&gt;</code>  works between things with at least one known flow (An IO or child&#39;s IO).",id:"concept-5---works-between-things-with-at-least-one-known-flow-an-io-or-childs-io",level:2},{value:"Conclusion:",id:"conclusion-4",level:3},{value:"Concept 6: <code>&lt;&gt;</code> and <code>:=</code> connect signals by field name.",id:"concept-6--and--connect-signals-by-field-name",level:2},{value:"Conclusion:",id:"conclusion-5",level:3}];function d(n){const e={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",img:"img",p:"p",pre:"pre",...(0,t.a)(),...n.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(e.h1,{id:"deep-dive-into-connection-operators",children:"Deep Dive into Connection Operators"}),"\n",(0,i.jsxs)(e.p,{children:["Chisel contains two connection operators, ",(0,i.jsx)(e.code,{children:":="})," and ",(0,i.jsx)(e.code,{children:"<>"}),". This document provides a deeper explanation of the differences of the two and when to use one or the other. The differences are demonstrated with experiments using Scastie examples which use ",(0,i.jsx)(e.code,{children:"DecoupledIO"}),"."]}),"\n",(0,i.jsx)(e.h3,{id:"experiment-setup",children:"Experiment Setup"}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-scala",children:"// Imports used by the following examples\nimport chisel3._\nimport chisel3.util.DecoupledIO\nimport circt.stage.ChiselStage\n"})}),"\n",(0,i.jsxs)(e.p,{children:["The diagram for the experiment can be viewed ",(0,i.jsx)(e.a,{href:"https://docs.google.com/document/d/14C918Hdahk2xOGSJJBT-ZVqAx99_hg3JQIq-vaaifQU/edit?usp=sharing",children:"here"}),".\n",(0,i.jsx)(e.img,{src:"https://raw.githubusercontent.com/chipsalliance/chisel3/master/docs/src/images/connection-operators-experiment.svg?sanitize=true",alt:"Experiment Image"})]}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-scala",children:"\nclass Wrapper extends Module{\n  val io = IO(new Bundle {\n  val in = Flipped(DecoupledIO(UInt(8.W)))\n  val out = DecoupledIO(UInt(8.W))\n  })\n  val p = Module(new PipelineStage)\n  val c = Module(new PipelineStage)\n  // connect Producer to IO\n  p.io.a <> io.in\n  // connect producer to consumer\n  c.io.a <> p.io.b\n  // connect consumer to IO\n  io.out <> c.io.b\n}\nclass PipelineStage extends Module{\n  val io = IO(new Bundle{\n    val a = Flipped(DecoupledIO(UInt(8.W)))\n    val b = DecoupledIO(UInt(8.W))\n  })\n  io.b <> io.a\n}\n"})}),"\n",(0,i.jsx)(e.p,{children:"Below we can see the resulting Verilog for this example:"}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-scala",children:'ChiselStage.emitSystemVerilog(new Wrapper)\n// res0: String = """// Generated by CIRCT firtool-1.61.0\n// module PipelineStage(\t// connection-operators.md:36:7\n//   output       io_a_ready,\t// connection-operators.md:37:14\n//   input        io_a_valid,\t// connection-operators.md:37:14\n//   input  [7:0] io_a_bits,\t// connection-operators.md:37:14\n//   input        io_b_ready,\t// connection-operators.md:37:14\n//   output       io_b_valid,\t// connection-operators.md:37:14\n//   output [7:0] io_b_bits\t// connection-operators.md:37:14\n// );\n// \n//   assign io_a_ready = io_b_ready;\t// connection-operators.md:36:7\n//   assign io_b_valid = io_a_valid;\t// connection-operators.md:36:7\n//   assign io_b_bits = io_a_bits;\t// connection-operators.md:36:7\n// endmodule\n// \n// module Wrapper(\t// connection-operators.md:20:7\n//   input        clock,\t// <stdin>:18:11\n//                reset,\t// <stdin>:19:11\n//   output       io_in_ready,\t// connection-operators.md:21:14\n//   input        io_in_valid,\t// connection-operators.md:21:14\n//   input  [7:0] io_in_bits,\t// connection-operators.md:21:14\n//   input        io_out_ready,\t// connection-operators.md:21:14\n//   output       io_out_valid,\t// connection-operators.md:21:14\n//   output [7:0] io_out_bits\t// connection-operators.md:21:14\n// );\n// \n//   wire       _c_io_a_ready;\t// connection-operators.md:26:17\n//   wire       _p_io_b_valid;\t// connection-operators.md:25:17\n//   wire [7:0] _p_io_b_bits;\t// connection-operators.md:25:17\n//   PipelineStage p (\t// connection-operators.md:25:17\n//     .io_a_ready (io_in_ready),\n//     .io_a_valid (io_in_valid),\n//     .io_a_bits  (io_in_bits),\n//     .io_b_ready (_c_io_a_ready),\t// connection-operators.md:26:17\n//     .io_b_valid (_p_io_b_valid),\n//     .io_b_bits  (_p_io_b_bits)\n//   );\n//   PipelineStage c (\t// connection-operators.md:26:17\n//     .io_a_ready (_c_io_a_ready),\n//     .io_a_valid (_p_io_b_valid),\t// connection-operators.md:25:17\n//     .io_a_bits  (_p_io_b_bits),\t// connection-operators.md:25:17\n//     .io_b_ready (io_out_ready),\n//     .io_b_valid (io_out_valid),\n//     .io_b_bits  (io_out_bits)\n//   );\n// endmodule\n// \n// """\n'})}),"\n",(0,i.jsxs)(e.h2,{id:"concept-1--is-commutative",children:["Concept 1: ",(0,i.jsx)(e.code,{children:"<>"})," is Commutative"]}),"\n",(0,i.jsxs)(e.p,{children:["This experiment is set up to test for the function of ",(0,i.jsx)(e.code,{children:"<>"})," using the experiment above."]}),"\n",(0,i.jsxs)(e.p,{children:["Achieving this involves flipping the RHS and LHS of the ",(0,i.jsx)(e.code,{children:"<>"})," operator and seeing how ",(0,i.jsx)(e.code,{children:"<>"}),"  will react.\n( Scastie link for the experiment:",(0,i.jsx)(e.a,{href:"https://scastie.scala-lang.org/Shorla/LVhlbkFQQnq7X3trHfgZZQ",children:"https://scastie.scala-lang.org/Shorla/LVhlbkFQQnq7X3trHfgZZQ"})," )"]}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-scala",children:"import chisel3._\nimport chisel3.util.DecoupledIO\nimport circt.stage.ChiselStage\n\nclass Wrapper extends Module{\n  val io = IO(new Bundle {\n  val in = Flipped(DecoupledIO(UInt(8.W)))\n  val out = DecoupledIO(UInt(8.W))\n  })\n  val p = Module(new PipelineStage)\n  val c = Module(new PipelineStage)\n  // connect producer to I/O\n  io.in <> p.io.a\n  // connect producer  to consumer\n  p.io.b <> c.io.a\n  // connect consumer to I/O\n  c.io.b <> io.out\n}\nclass PipelineStage extends Module{\n  val io = IO(new Bundle{\n    val a = Flipped(DecoupledIO(UInt(8.W)))\n    val b = DecoupledIO(UInt(8.W))\n  })\n  io.a <> io.b\n}\n"})}),"\n",(0,i.jsx)(e.p,{children:"Below we can see the resulting Verilog for this example:"}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-scala",children:'ChiselStage.emitSystemVerilog(new Wrapper)\n// res2: String = """// Generated by CIRCT firtool-1.61.0\n// module PipelineStage(\t// connection-operators.md:82:7\n//   output       io_a_ready,\t// connection-operators.md:83:14\n//   input        io_a_valid,\t// connection-operators.md:83:14\n//   input  [7:0] io_a_bits,\t// connection-operators.md:83:14\n//   input        io_b_ready,\t// connection-operators.md:83:14\n//   output       io_b_valid,\t// connection-operators.md:83:14\n//   output [7:0] io_b_bits\t// connection-operators.md:83:14\n// );\n// \n//   assign io_a_ready = io_b_ready;\t// connection-operators.md:82:7\n//   assign io_b_valid = io_a_valid;\t// connection-operators.md:82:7\n//   assign io_b_bits = io_a_bits;\t// connection-operators.md:82:7\n// endmodule\n// \n// module Wrapper(\t// connection-operators.md:66:7\n//   input        clock,\t// <stdin>:18:11\n//                reset,\t// <stdin>:19:11\n//   output       io_in_ready,\t// connection-operators.md:67:14\n//   input        io_in_valid,\t// connection-operators.md:67:14\n//   input  [7:0] io_in_bits,\t// connection-operators.md:67:14\n//   input        io_out_ready,\t// connection-operators.md:67:14\n//   output       io_out_valid,\t// connection-operators.md:67:14\n//   output [7:0] io_out_bits\t// connection-operators.md:67:14\n// );\n// \n//   wire       _c_io_a_ready;\t// connection-operators.md:72:17\n//   wire       _p_io_b_valid;\t// connection-operators.md:71:17\n//   wire [7:0] _p_io_b_bits;\t// connection-operators.md:71:17\n//   PipelineStage p (\t// connection-operators.md:71:17\n//     .io_a_ready (io_in_ready),\n//     .io_a_valid (io_in_valid),\n//     .io_a_bits  (io_in_bits),\n//     .io_b_ready (_c_io_a_ready),\t// connection-operators.md:72:17\n//     .io_b_valid (_p_io_b_valid),\n//     .io_b_bits  (_p_io_b_bits)\n//   );\n//   PipelineStage c (\t// connection-operators.md:72:17\n//     .io_a_ready (_c_io_a_ready),\n//     .io_a_valid (_p_io_b_valid),\t// connection-operators.md:71:17\n//     .io_a_bits  (_p_io_b_bits),\t// connection-operators.md:71:17\n//     .io_b_ready (io_out_ready),\n//     .io_b_valid (io_out_valid),\n//     .io_b_bits  (io_out_bits)\n//   );\n// endmodule\n// \n// """\n'})}),"\n",(0,i.jsx)(e.h3,{id:"conclusion",children:"Conclusion:"}),"\n",(0,i.jsxs)(e.p,{children:["The Verilog remained the same without incurring errors, showing that the ",(0,i.jsx)(e.code,{children:"<>"})," operator is commutative."]}),"\n",(0,i.jsxs)(e.h2,{id:"concept-2--means-assign-all-lhs-signals-from-the-rhs-regardless-of-the-direction-on-the-lhs",children:["Concept 2: ",(0,i.jsx)(e.code,{children:":="})," means assign ALL LHS signals from the RHS, regardless of the direction on the LHS."]}),"\n",(0,i.jsxs)(e.p,{children:["Using the same experiment code as above, we set to test for the function of ",(0,i.jsx)(e.code,{children:":="}),"\nWe replace all instances of ",(0,i.jsx)(e.code,{children:"<>"})," with ",(0,i.jsx)(e.code,{children:":="})," in the sample code above.\n(Scastie link to the experiment: ",(0,i.jsx)(e.a,{href:"https://scastie.scala-lang.org/Shorla/o1ShdaY3RWKf0IIFwwQ1UQ/1",children:"https://scastie.scala-lang.org/Shorla/o1ShdaY3RWKf0IIFwwQ1UQ/1"}),")"]}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-scala",children:"import chisel3._\nimport chisel3.util.DecoupledIO\nimport circt.stage.ChiselStage\n\nclass Wrapper extends Module{\n  val io = IO(new Bundle {\n  val in = Flipped(DecoupledIO(UInt(8.W)))\n  val out = DecoupledIO(UInt(8.W))\n  })\n  val p = Module(new PipelineStage)\n  val c = Module(new PipelineStage)\n  // connect producer to I/O\n  p.io.a := io.in\n  // connect producer  to consumer\n  c.io.a := p.io.b\n  // connect consumer to I/O\n  io.out := c.io.b\n}\nclass PipelineStage extends Module{\n  val io = IO(new Bundle{\n    val a = Flipped(DecoupledIO(UInt(8.W)))\n    val b = DecoupledIO(UInt(8.W))\n  })\n  io.a := io.b\n}\n"})}),"\n",(0,i.jsx)(e.p,{children:"Below we can see the resulting error message for this example:"}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-scala",children:"ChiselStage.emitSystemVerilog(new Wrapper)\n// chisel3.package$ChiselException: Connection between sink (PipelineStage.io.a: IO[DecoupledIO]) and source (PipelineStage.io.b: IO[DecoupledIO]) failed @: .bitsio.a.bits in PipelineStage cannot be written from module PipelineStage.\n// \tat ... ()\n// \tat repl.MdocSession$MdocApp3$PipelineStage.<init>(connection-operators.md:133)\n// \tat repl.MdocSession$MdocApp3$Wrapper$$anonfun$30$$anonfun$apply$20.apply(connection-operators.md:117)\n// \tat repl.MdocSession$MdocApp3$Wrapper$$anonfun$30$$anonfun$apply$20.apply(connection-operators.md:117)\n// \tat chisel3.Module$.evaluate(Module.scala:91)\n// \tat chisel3.Module$.do_apply(Module.scala:38)\n// \tat repl.MdocSession$MdocApp3$Wrapper$$anonfun$30.apply(connection-operators.md:117)\n// \tat repl.MdocSession$MdocApp3$Wrapper$$anonfun$30.apply(connection-operators.md:117)\n// \tat chisel3.internal.plugin.package$.autoNameRecursively(package.scala:33)\n// \tat repl.MdocSession$MdocApp3$Wrapper.<init>(connection-operators.md:117)\n// \tat repl.MdocSession$MdocApp3$$anonfun$39$$anonfun$apply$25.apply(connection-operators.md:141)\n// \tat repl.MdocSession$MdocApp3$$anonfun$39$$anonfun$apply$25.apply(connection-operators.md:141)\n// \tat ... ()\n// \tat ... (Stack trace trimmed to user code only. Rerun with --full-stacktrace to see the full stack trace)\n"})}),"\n",(0,i.jsx)(e.h3,{id:"conclusion-1",children:"Conclusion:"}),"\n",(0,i.jsx)(e.p,{children:"The := operator goes field-by-field on the LHS and attempts to connect it to the same-named signal from the RHS. If something on the LHS is actually an Input, or the corresponding signal on the RHS is an Output, you will get an error as shown above."}),"\n",(0,i.jsxs)(e.h2,{id:"concept-3-always-use--to-assign-dontcare-to-wires",children:["Concept 3: Always Use ",(0,i.jsx)(e.code,{children:":="})," to assign DontCare to Wires"]}),"\n",(0,i.jsxs)(e.p,{children:["When assigning ",(0,i.jsx)(e.code,{children:"DontCare"})," to something that is not directioned, should you use ",(0,i.jsx)(e.code,{children:":="})," or ",(0,i.jsx)(e.code,{children:"<>"}),"?\nWe will find out using the sample codes below:\n( Scastie link for the experiment:",(0,i.jsx)(e.a,{href:"https://scastie.scala-lang.org/Shorla/ZIGsWcylRqKJhZCkKWlSIA/1",children:"https://scastie.scala-lang.org/Shorla/ZIGsWcylRqKJhZCkKWlSIA/1"}),")"]}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-scala",children:"import chisel3._\nimport chisel3.util.DecoupledIO\nimport circt.stage.ChiselStage\n\nclass Wrapper extends Module{\n  val io = IO(new Bundle {\n  val in = Flipped(DecoupledIO(UInt(8.W)))\n  val out = DecoupledIO(UInt(8.W))\n  })\n  val p = Module(new PipelineStage)\n  val c = Module(new PipelineStage)\n  //connect Producer to IO\n  io.in := DontCare\n  p.io.a <> DontCare\n  val tmp = Wire(Flipped(DecoupledIO(UInt(8.W))))\n  tmp := DontCare\n  p.io.a <> io.in\n  // connect producer to consumer\n  c.io.a <> p.io.b\n  //connect consumer to IO\n  io.out <> c.io.b\n}\nclass PipelineStage extends Module{\n  val io = IO(new Bundle{\n    val a = Flipped(DecoupledIO(UInt(8.W)))\n    val b = DecoupledIO(UInt(8.W))\n  })\n  io.b <> io.a\n}\n"})}),"\n",(0,i.jsx)(e.p,{children:"Below we can see the resulting Verilog for this example:"}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-scala",children:'ChiselStage.emitSystemVerilog(new Wrapper)\n// res5: String = """// Generated by CIRCT firtool-1.61.0\n// module PipelineStage(\t// connection-operators.md:182:7\n//   output       io_a_ready,\t// connection-operators.md:183:14\n//   input        io_a_valid,\t// connection-operators.md:183:14\n//   input  [7:0] io_a_bits,\t// connection-operators.md:183:14\n//   input        io_b_ready,\t// connection-operators.md:183:14\n//   output       io_b_valid,\t// connection-operators.md:183:14\n//   output [7:0] io_b_bits\t// connection-operators.md:183:14\n// );\n// \n//   assign io_a_ready = io_b_ready;\t// connection-operators.md:182:7\n//   assign io_b_valid = io_a_valid;\t// connection-operators.md:182:7\n//   assign io_b_bits = io_a_bits;\t// connection-operators.md:182:7\n// endmodule\n// \n// module Wrapper(\t// connection-operators.md:162:7\n//   input        clock,\t// <stdin>:18:11\n//                reset,\t// <stdin>:19:11\n//   output       io_in_ready,\t// connection-operators.md:163:14\n//   input        io_in_valid,\t// connection-operators.md:163:14\n//   input  [7:0] io_in_bits,\t// connection-operators.md:163:14\n//   input        io_out_ready,\t// connection-operators.md:163:14\n//   output       io_out_valid,\t// connection-operators.md:163:14\n//   output [7:0] io_out_bits\t// connection-operators.md:163:14\n// );\n// \n//   wire       _c_io_a_ready;\t// connection-operators.md:168:17\n//   wire       _p_io_b_valid;\t// connection-operators.md:167:17\n//   wire [7:0] _p_io_b_bits;\t// connection-operators.md:167:17\n//   PipelineStage p (\t// connection-operators.md:167:17\n//     .io_a_ready (io_in_ready),\n//     .io_a_valid (io_in_valid),\n//     .io_a_bits  (io_in_bits),\n//     .io_b_ready (_c_io_a_ready),\t// connection-operators.md:168:17\n//     .io_b_valid (_p_io_b_valid),\n//     .io_b_bits  (_p_io_b_bits)\n//   );\n//   PipelineStage c (\t// connection-operators.md:168:17\n//     .io_a_ready (_c_io_a_ready),\n//     .io_a_valid (_p_io_b_valid),\t// connection-operators.md:167:17\n//     .io_a_bits  (_p_io_b_bits),\t// connection-operators.md:167:17\n//     .io_b_ready (io_out_ready),\n//     .io_b_valid (io_out_valid),\n//     .io_b_bits  (io_out_bits)\n//   );\n// endmodule\n// \n// """\n'})}),"\n",(0,i.jsx)(e.h3,{id:"conclusion-2",children:"Conclusion:"}),"\n",(0,i.jsxs)(e.p,{children:["If ",(0,i.jsx)(e.code,{children:"<>"})," were used to assign the unidrectioned wire ",(0,i.jsx)(e.code,{children:"tmp"})," to DontCare, we would get an error. But in the example above, we used ",(0,i.jsx)(e.code,{children:":="})," and no errors occurred.\nBut when ",(0,i.jsx)(e.code,{children:":="})," was used to assign the wire to DontCare, no errors will occur."]}),"\n",(0,i.jsxs)(e.p,{children:["Thus, when assigning ",(0,i.jsx)(e.code,{children:"DontCare"})," to a ",(0,i.jsx)(e.code,{children:"Wire"}),", always use ",(0,i.jsx)(e.code,{children:":="}),"."]}),"\n",(0,i.jsxs)(e.h2,{id:"concept-4-you-can-use--or--to-assign-dontcare-to-directioned-things-ios",children:["Concept 4: You can use ",(0,i.jsx)(e.code,{children:"<>"})," or ",(0,i.jsx)(e.code,{children:":="})," to assign ",(0,i.jsx)(e.code,{children:"DontCare"})," to directioned things (IOs)"]}),"\n",(0,i.jsxs)(e.p,{children:["When assigning ",(0,i.jsx)(e.code,{children:"DontCare"})," to something that is directioned, should you use ",(0,i.jsx)(e.code,{children:":="})," or ",(0,i.jsx)(e.code,{children:"<>"}),"?\nWe will find out using the sample codes below:\n( Scastie link for the experiment:",(0,i.jsx)(e.a,{href:"https://scastie.scala-lang.org/Shorla/ZIGsWcylRqKJhZCkKWlSIA/1",children:"https://scastie.scala-lang.org/Shorla/ZIGsWcylRqKJhZCkKWlSIA/1"}),")"]}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-scala",children:"import chisel3._\nimport chisel3.util.DecoupledIO\nimport circt.stage.ChiselStage\n\nclass Wrapper extends Module{\n  val io = IO(new Bundle {\n  val in = Flipped(DecoupledIO(UInt(8.W)))\n  val out = DecoupledIO(UInt(8.W))\n  })\n  val p = Module(new PipelineStage)\n  val c = Module(new PipelineStage)\n  //connect Producer to IO\n  io.in := DontCare\n  p.io.a <> DontCare\n  val tmp = Wire(Flipped(DecoupledIO(UInt(8.W))))\n  tmp := DontCare\n  p.io.a <> io.in\n  // connect producer to consumer\n  c.io.a <> p.io.b\n  //connect consumer to IO\n  io.out <> c.io.b\n}\nclass PipelineStage extends Module{\n  val io = IO(new Bundle{\n    val a = Flipped(DecoupledIO(UInt(8.W)))\n    val b = DecoupledIO(UInt(8.W))\n  })\n  io.b <> io.a\n}\n"})}),"\n",(0,i.jsx)(e.p,{children:"Below we can see the resulting Verilog for this example:"}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-scala",children:'ChiselStage.emitSystemVerilog(new Wrapper)\n// res7: String = """// Generated by CIRCT firtool-1.61.0\n// module PipelineStage(\t// connection-operators.md:232:7\n//   output       io_a_ready,\t// connection-operators.md:233:14\n//   input        io_a_valid,\t// connection-operators.md:233:14\n//   input  [7:0] io_a_bits,\t// connection-operators.md:233:14\n//   input        io_b_ready,\t// connection-operators.md:233:14\n//   output       io_b_valid,\t// connection-operators.md:233:14\n//   output [7:0] io_b_bits\t// connection-operators.md:233:14\n// );\n// \n//   assign io_a_ready = io_b_ready;\t// connection-operators.md:232:7\n//   assign io_b_valid = io_a_valid;\t// connection-operators.md:232:7\n//   assign io_b_bits = io_a_bits;\t// connection-operators.md:232:7\n// endmodule\n// \n// module Wrapper(\t// connection-operators.md:212:7\n//   input        clock,\t// <stdin>:18:11\n//                reset,\t// <stdin>:19:11\n//   output       io_in_ready,\t// connection-operators.md:213:14\n//   input        io_in_valid,\t// connection-operators.md:213:14\n//   input  [7:0] io_in_bits,\t// connection-operators.md:213:14\n//   input        io_out_ready,\t// connection-operators.md:213:14\n//   output       io_out_valid,\t// connection-operators.md:213:14\n//   output [7:0] io_out_bits\t// connection-operators.md:213:14\n// );\n// \n//   wire       _c_io_a_ready;\t// connection-operators.md:218:17\n//   wire       _p_io_b_valid;\t// connection-operators.md:217:17\n//   wire [7:0] _p_io_b_bits;\t// connection-operators.md:217:17\n//   PipelineStage p (\t// connection-operators.md:217:17\n//     .io_a_ready (io_in_ready),\n//     .io_a_valid (io_in_valid),\n//     .io_a_bits  (io_in_bits),\n//     .io_b_ready (_c_io_a_ready),\t// connection-operators.md:218:17\n//     .io_b_valid (_p_io_b_valid),\n//     .io_b_bits  (_p_io_b_bits)\n//   );\n//   PipelineStage c (\t// connection-operators.md:218:17\n//     .io_a_ready (_c_io_a_ready),\n//     .io_a_valid (_p_io_b_valid),\t// connection-operators.md:217:17\n//     .io_a_bits  (_p_io_b_bits),\t// connection-operators.md:217:17\n//     .io_b_ready (io_out_ready),\n//     .io_b_valid (io_out_valid),\n//     .io_b_bits  (io_out_bits)\n//   );\n// endmodule\n// \n// """\n'})}),"\n",(0,i.jsx)(e.h3,{id:"conclusion-3",children:"Conclusion:"}),"\n",(0,i.jsxs)(e.p,{children:["Both ",(0,i.jsx)(e.code,{children:"<>"})," and ",(0,i.jsx)(e.code,{children:":="})," can be used to assign directioned things (IOs) to DontCare as shown in ",(0,i.jsx)(e.code,{children:"io.in"})," and ",(0,i.jsx)(e.code,{children:"p.io.a"})," respectively. This is basically equivalent because in this case both ",(0,i.jsx)(e.code,{children:"<>"})," and ",(0,i.jsx)(e.code,{children:":="})," will determine the direction from the LHS."]}),"\n",(0,i.jsxs)(e.h2,{id:"concept-5---works-between-things-with-at-least-one-known-flow-an-io-or-childs-io",children:["Concept 5: ",(0,i.jsx)(e.code,{children:"<>"}),"  works between things with at least one known flow (An IO or child's IO)."]}),"\n",(0,i.jsxs)(e.p,{children:["If there is at least one known flow what will ",(0,i.jsx)(e.code,{children:"<>"})," do? This will be shown using the experiment code below:\n( Scastie link for the experiment:",(0,i.jsx)(e.a,{href:"https://scastie.scala-lang.org/Shorla/gKx9ReLVTTqDTk9vmw5ozg",children:"https://scastie.scala-lang.org/Shorla/gKx9ReLVTTqDTk9vmw5ozg"}),")"]}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-scala",children:"import chisel3._\nimport chisel3.util.DecoupledIO\nimport circt.stage.ChiselStage\n\nclass Wrapper extends Module{\n  val io = IO(new Bundle {\n  val in = Flipped(DecoupledIO(UInt(8.W)))\n  val out = DecoupledIO(UInt(8.W))\n  })\n  val p = Module(new PipelineStage)\n  val c = Module(new PipelineStage)\n  //connect Producer to IO\n    // For this experiment, we add a temporary wire and see if it works...\n  //p.io.a <> io.in\n  val tmp = Wire(DecoupledIO(UInt(8.W)))\n  // connect intermediate wire\n  tmp <> io.in\n  p.io.a <> tmp\n  // connect producer to consumer\n  c.io.a <> p.io.b\n  //connect consumer to IO\n  io.out <> c.io.b\n}\nclass PipelineStage extends Module{\n  val io = IO(new Bundle{\n    val a = Flipped(DecoupledIO(UInt(8.W)))\n    val b = DecoupledIO(UInt(8.W))\n  })\n  io.b <> io.a\n}\n"})}),"\n",(0,i.jsx)(e.p,{children:"Below we can see the resulting Verilog for this example:"}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-scala",children:'ChiselStage.emitSystemVerilog(new Wrapper)\n// res9: String = """// Generated by CIRCT firtool-1.61.0\n// module PipelineStage(\t// connection-operators.md:283:7\n//   output       io_a_ready,\t// connection-operators.md:284:14\n//   input        io_a_valid,\t// connection-operators.md:284:14\n//   input  [7:0] io_a_bits,\t// connection-operators.md:284:14\n//   input        io_b_ready,\t// connection-operators.md:284:14\n//   output       io_b_valid,\t// connection-operators.md:284:14\n//   output [7:0] io_b_bits\t// connection-operators.md:284:14\n// );\n// \n//   assign io_a_ready = io_b_ready;\t// connection-operators.md:283:7\n//   assign io_b_valid = io_a_valid;\t// connection-operators.md:283:7\n//   assign io_b_bits = io_a_bits;\t// connection-operators.md:283:7\n// endmodule\n// \n// module Wrapper(\t// connection-operators.md:262:7\n//   input        clock,\t// <stdin>:18:11\n//                reset,\t// <stdin>:19:11\n//   output       io_in_ready,\t// connection-operators.md:263:14\n//   input        io_in_valid,\t// connection-operators.md:263:14\n//   input  [7:0] io_in_bits,\t// connection-operators.md:263:14\n//   input        io_out_ready,\t// connection-operators.md:263:14\n//   output       io_out_valid,\t// connection-operators.md:263:14\n//   output [7:0] io_out_bits\t// connection-operators.md:263:14\n// );\n// \n//   wire       _c_io_a_ready;\t// connection-operators.md:268:17\n//   wire       _p_io_b_valid;\t// connection-operators.md:267:17\n//   wire [7:0] _p_io_b_bits;\t// connection-operators.md:267:17\n//   PipelineStage p (\t// connection-operators.md:267:17\n//     .io_a_ready (io_in_ready),\n//     .io_a_valid (io_in_valid),\n//     .io_a_bits  (io_in_bits),\n//     .io_b_ready (_c_io_a_ready),\t// connection-operators.md:268:17\n//     .io_b_valid (_p_io_b_valid),\n//     .io_b_bits  (_p_io_b_bits)\n//   );\n//   PipelineStage c (\t// connection-operators.md:268:17\n//     .io_a_ready (_c_io_a_ready),\n//     .io_a_valid (_p_io_b_valid),\t// connection-operators.md:267:17\n//     .io_a_bits  (_p_io_b_bits),\t// connection-operators.md:267:17\n//     .io_b_ready (io_out_ready),\n//     .io_b_valid (io_out_valid),\n//     .io_b_bits  (io_out_bits)\n//   );\n// endmodule\n// \n// """\n'})}),"\n",(0,i.jsx)(e.h3,{id:"conclusion-4",children:"Conclusion:"}),"\n",(0,i.jsxs)(e.p,{children:["The connection above went smoothly with no errors, this goes to show ",(0,i.jsx)(e.code,{children:"<>"}),' will work as long as there is at least one directioned thing (IO or submodule\'s IO) to "fix" the direction.']}),"\n",(0,i.jsxs)(e.h2,{id:"concept-6--and--connect-signals-by-field-name",children:["Concept 6: ",(0,i.jsx)(e.code,{children:"<>"})," and ",(0,i.jsx)(e.code,{children:":="})," connect signals by field name."]}),"\n",(0,i.jsxs)(e.p,{children:["This experiment creates a MockDecoupledIO which has the same fields by name as a DecoupledIO. Chisel lets us connect it and produces the same verilog, even though MockDecoupledIO and DecoupledIO are different types.\n( Scastie link for the experiment:",(0,i.jsx)(e.a,{href:"https://scastie.scala-lang.org/Uf4tQquvQYigZAW705NFIQ",children:"https://scastie.scala-lang.org/Uf4tQquvQYigZAW705NFIQ"}),")"]}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-scala",children:"import chisel3._\nimport chisel3.util.DecoupledIO\nimport circt.stage.ChiselStage\n\nclass MockDecoupledIO extends Bundle {\n  val valid = Output(Bool())\n  val ready = Input(Bool())\n  val bits = Output(UInt(8.W))\n}\nclass Wrapper extends Module{\n  val io = IO(new Bundle {\n  val in = Flipped(new MockDecoupledIO())\n  val out = new MockDecoupledIO()\n  })\n  val p = Module(new PipelineStage)\n  val c = Module(new PipelineStage)\n  // connect producer to I/O\n  p.io.a <> io.in\n  // connect producer  to consumer\n  c.io.a <> p.io.b\n  // connect consumer to I/O\n  io.out <> c.io.b\n}\nclass PipelineStage extends Module{\n  val io = IO(new Bundle{\n    val a = Flipped(DecoupledIO(UInt(8.W)))\n    val b = DecoupledIO(UInt(8.W))\n  })\n  io.a <> io.b\n}\n"})}),"\n",(0,i.jsx)(e.p,{children:"Below we can see the resulting Verilog for this example:"}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-scala",children:'ChiselStage.emitSystemVerilog(new Wrapper)\n// res11: String = """// Generated by CIRCT firtool-1.61.0\n// module PipelineStage(\t// connection-operators.md:336:7\n//   output       io_a_ready,\t// connection-operators.md:337:14\n//   input        io_a_valid,\t// connection-operators.md:337:14\n//   input  [7:0] io_a_bits,\t// connection-operators.md:337:14\n//   input        io_b_ready,\t// connection-operators.md:337:14\n//   output       io_b_valid,\t// connection-operators.md:337:14\n//   output [7:0] io_b_bits\t// connection-operators.md:337:14\n// );\n// \n//   assign io_a_ready = io_b_ready;\t// connection-operators.md:336:7\n//   assign io_b_valid = io_a_valid;\t// connection-operators.md:336:7\n//   assign io_b_bits = io_a_bits;\t// connection-operators.md:336:7\n// endmodule\n// \n// module Wrapper(\t// connection-operators.md:320:7\n//   input        clock,\t// <stdin>:18:11\n//                reset,\t// <stdin>:19:11\n//                io_in_valid,\t// connection-operators.md:321:14\n//   output       io_in_ready,\t// connection-operators.md:321:14\n//   input  [7:0] io_in_bits,\t// connection-operators.md:321:14\n//   output       io_out_valid,\t// connection-operators.md:321:14\n//   input        io_out_ready,\t// connection-operators.md:321:14\n//   output [7:0] io_out_bits\t// connection-operators.md:321:14\n// );\n// \n//   wire       _c_io_a_ready;\t// connection-operators.md:326:17\n//   wire       _p_io_b_valid;\t// connection-operators.md:325:17\n//   wire [7:0] _p_io_b_bits;\t// connection-operators.md:325:17\n//   PipelineStage p (\t// connection-operators.md:325:17\n//     .io_a_ready (io_in_ready),\n//     .io_a_valid (io_in_valid),\n//     .io_a_bits  (io_in_bits),\n//     .io_b_ready (_c_io_a_ready),\t// connection-operators.md:326:17\n//     .io_b_valid (_p_io_b_valid),\n//     .io_b_bits  (_p_io_b_bits)\n//   );\n//   PipelineStage c (\t// connection-operators.md:326:17\n//     .io_a_ready (_c_io_a_ready),\n//     .io_a_valid (_p_io_b_valid),\t// connection-operators.md:325:17\n//     .io_a_bits  (_p_io_b_bits),\t// connection-operators.md:325:17\n//     .io_b_ready (io_out_ready),\n//     .io_b_valid (io_out_valid),\n//     .io_b_bits  (io_out_bits)\n//   );\n// endmodule\n// \n// """\n'})}),"\n",(0,i.jsxs)(e.p,{children:["And here is another experiment, where we remove one of the fields of MockDecoupledIO:\n( Scastie link for the experiment:",(0,i.jsx)(e.a,{href:"https://scastie.scala-lang.org/ChtkhKCpS9CvJkjjqpdeIA",children:"https://scastie.scala-lang.org/ChtkhKCpS9CvJkjjqpdeIA"}),")"]}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-scala",children:"import chisel3._\nimport chisel3.util.DecoupledIO\nimport circt.stage.ChiselStage\n\nclass MockDecoupledIO extends Bundle {\n  val valid = Output(Bool())\n  val ready = Input(Bool())\n  //val bits = Output(UInt(8.W))\n}\nclass Wrapper extends Module{\n  val io = IO(new Bundle {\n  val in = Flipped(new MockDecoupledIO())\n  val out = new MockDecoupledIO()\n  })\n  val p = Module(new PipelineStage)\n  val c = Module(new PipelineStage)\n  // connect producer to I/O\n  p.io.a <> io.in\n  // connect producer  to consumer\n  c.io.a <> p.io.b\n  // connect consumer to I/O\n  io.out <> c.io.b\n}\nclass PipelineStage extends Module{\n  val io = IO(new Bundle{\n    val a = Flipped(DecoupledIO(UInt(8.W)))\n    val b = DecoupledIO(UInt(8.W))\n  })\n  io.a <> io.b\n}\n"})}),"\n",(0,i.jsx)(e.p,{children:"Below we can see the resulting error for this example:"}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-scala",children:"ChiselStage.emitSystemVerilog(new Wrapper)\n// chisel3.package$ChiselException: Connection between left (PipelineStage.io.a: IO[DecoupledIO]) and source (Wrapper.io.in: IO[MockDecoupledIO]) failed @.bits: Right Record missing field (bits).\n// \tat ... ()\n// \tat repl.MdocSession$MdocApp12$Wrapper.<init>(connection-operators.md:381)\n// \tat repl.MdocSession$MdocApp12$$anonfun$119$$anonfun$apply$79.apply(connection-operators.md:402)\n// \tat repl.MdocSession$MdocApp12$$anonfun$119$$anonfun$apply$79.apply(connection-operators.md:402)\n// \tat ... ()\n// \tat ... (Stack trace trimmed to user code only. Rerun with --full-stacktrace to see the full stack trace)\n"})}),"\n",(0,i.jsxs)(e.p,{children:["This one fails because there is a field ",(0,i.jsx)(e.code,{children:"bits"})," missing."]}),"\n",(0,i.jsx)(e.h3,{id:"conclusion-5",children:"Conclusion:"}),"\n",(0,i.jsxs)(e.p,{children:["For ",(0,i.jsx)(e.code,{children:":="}),", the Scala types do not need to match but all the signals on the LHS must be provided by the RHS or you will get a Chisel elaboration error. There may be additional signals on the RHS, these will be ignored. For ",(0,i.jsx)(e.code,{children:"<>"}),", the Scala types do not need to match, but all signals must match exactly between LHS and RHS. In both cases, the order of the fields does not matter."]})]})}function p(n={}){const{wrapper:e}={...(0,t.a)(),...n.components};return e?(0,i.jsx)(e,{...n,children:(0,i.jsx)(d,{...n})}):d(n)}},1151:(n,e,o)=>{o.d(e,{Z:()=>s,a:()=>c});var i=o(7294);const t={},a=i.createContext(t);function c(n){const e=i.useContext(a);return i.useMemo((function(){return"function"==typeof n?n(e):{...e,...n}}),[e,n])}function s(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(t):n.components||t:c(n.components),i.createElement(a.Provider,{value:e},n.children)}}}]);