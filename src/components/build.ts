import react = require("react");
import TypedReact = require("typed-react");

interface ComponentClass<P, S> {
  new (): TypedReact.Component<P, S>;
}

function build<P, S>(clazz: ComponentClass<P, S>): React.ComponentFactory<P> {
  return react.createFactory(TypedReact.createClass<P, S>(clazz));
}

export = build;
