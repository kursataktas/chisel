// SPDX-License-Identifier: Apache-2.0

package chisel3.probe

import chisel3._
import chisel3.experimental.SourceInfo

object Probe extends ProbeBase with SourceInfoDoc {

  /** Mark a Chisel type as with a probe modifier.
    */
  def apply[T <: Data](source: => T): T = super.apply(source, false, None)

  def apply[T <: Data](source: => T, color: layer.Layer): T = super.apply(source, false, Some(color))
}

object RWProbe extends ProbeBase with SourceInfoDoc {

  /** Mark a Chisel type with a writable probe modifier.
    */
  def apply[T <: Data](source: => T): T = super.apply(source, true)
}
