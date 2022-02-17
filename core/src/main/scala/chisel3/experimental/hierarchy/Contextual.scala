package chisel3.experimental.hierarchy
import chisel3.internal.Builder
import chisel3.experimental.BaseModule


/*
IsContextual >>> IsInstantiable // Subclasses of this can be wrapped in Contextual/Instance
Contextual[X] >>> Hierarchy[X]
@instantiable derives lookup typeclasses with edits on the protoValue => retValue
  Lookupable:    T => Hierarchy[T]               // Starts context
  Lookupable:    Hierarchy[T] => Hierarchy[T]    // Passes context
  Contextualize: Hierarchy[T] => Hierarchy[T]    // Applies context, recursively
  Lensable:      T => Lense[T]
  Lensable:      Lense[T] => Lense[T]
  Lensable editors on implicit class
@contextual derives lookup typeclasses with edits on the protoValue => retValue
  Lookupable:    Contextual[T] => T        // Begins consumption of context, calls Contextualize
  Contextualize: T => T                    // Applies context recursively
  Lensable:      T => Editable[T]
*/

// Indicates the Contextualize typeclass will be implemented for subclasses
trait IsContextualizable
// Typeclass used when auto-generating contextualize typeclass implementations
trait Contextualize[T <: IsContextualizable] {
  def contextualize[I <: IsInstantiable](h: Hierarchy[I], contextual: T): T
}

//@contextual
//case class JackCaseClass(i: Int)
//
////@contextual
//case class AdamCaseClass(i: Int, j: JackCaseClass)
////AutoGenerated
//object AdamCaseClass {
//  implicit def buildContextualize(implicit a0: Contextualize[Int], a1: Contextualize[JackCaseClass]): Contextualize[AdamCaseClass] = new Contextualize[AdamCaseClass] {
//    def contextualize[I](h: Hierarchy[I], contextual: AdamCaseClass): AdamCaseClass = {
//      new AdamCaseClass(a0.contextualize(h, contextual.i), a1.contextualize(h, contextual.j))
//    }
//  }
//}

/** Contextual represent context-dependent values which can be passed around in various datastructures
  * Contextual values can only be accessed through calling @public vals from the Hierarchy[_]
  *
  * @param values
  */
case class Contextual[T <: IsInstantiable, V] private[chisel3] (private[chisel3] val values: Seq[(Hierarchy[T], V)]) {
  // Only ever called in lookupable
  private[chisel3] def get(context: Hierarchy[T]): V = {
    val matchingValues = values.collect {
      //case (h: Hierarchy[T], value: V) if Contextual.viewableFrom(h, context) => value
      case (h: Hierarchy[T], value: V) => value
    }
    lazy val contextString = context match {
      case h: Instance[BaseModule] if h.isA[BaseModule] => h.toTarget.toString
      case h: Definition[BaseModule] if h.isA[BaseModule] => h.toTarget.toString
      case other => context.toString
    }
    require(matchingValues.size > 0, s"Contextual is empty when accessed from ${contextString}")
    require(matchingValues.size == 1)
    matchingValues.head
  }
  //def ++ (other: Contextual[T, V]): Contextual[T, V] = Contextual(values ++ other.values)
}

object Contextual {
  //def collapse[T <: IsInstantiable, V](seq: Seq[Contextual[T, V]]): Contextual[T, V] = seq.foldLeft(Contextual.empty[T, V]) { case (agg, c) => agg ++ c }

  def apply[V](value: V) = {
    val currentModule = Builder.currentModule.get
    new Contextual(Seq(currentModule.toDefinition -> value))
  }
  def empty[V]: Contextual[BaseModule, V] = new Contextual(Seq.empty[(Hierarchy[BaseModule], V)])

  def apply[I <: IsInstantiable, V](context: I, value: V) = new Contextual(Seq((context.toInstance, value)))
  def apply[I <: IsInstantiable, V]() = new Contextual(Seq.empty[(Hierarchy[I],V)])

  // This needs to be a derived typeclass w.r.t. the hierarchical type in Contextual
  def viewableFrom[T <: IsInstantiable](h: Hierarchy[T], context: Hierarchy[T]): Boolean = ???
}
