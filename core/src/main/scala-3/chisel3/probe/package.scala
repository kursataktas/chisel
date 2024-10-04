// SPDX-License-Identifier: Apache-2.0

package chisel3

import chisel3._

package object probe extends ObjectProbeImpl with SourceInfoDoc {

  /** Access the value of a probe.
    *
    * @param source probe whose value is getting accessed
    */
  def read[T <: Data](source: T): T = _readImpl(source)
}
