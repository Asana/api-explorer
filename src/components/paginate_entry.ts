import React = require("react");

var r = React.DOM;

/**
 * Allows users to change their pagination settings.
 */
class PaginateEntry extends React.Component<PaginateEntry.Props, {}> {
  static create = React.createFactory(PaginateEntry);

  private renderPaginateInputs = () => {
    // If the values are not set, or 0, display empty string.
    var limitValue = !this.props.paginateParams.limit ?
      "" : this.props.paginateParams.limit.toString();
    var offsetValue = !this.props.paginateParams.offset ?
      "" : this.props.paginateParams.offset;

    return r.span({},
      r.label({ },
        "Limit"
      ),
      r.input({
        type: "number",
        className: "paginate-entry-limit",
        min: "0",
        onChange: this.props.onPaginateChange("limit"),
        placeholder: "Limit",
        value: limitValue
      }),
      r.label({ },
        "Offset"
      ),
      r.input({
        type: "text",
        className: "paginate-entry-offset",
        onChange: this.props.onPaginateChange("offset"),
        placeholder: "Offset",
        value: offsetValue
      })
    );
  };

  render() {
    return r.div({
        className: "paginate-entry",
        children: [
          this.props.text,
          this.props.canPaginate ?
            this.renderPaginateInputs() :
            r.small({ }, "Pagination is not available on this route.")
        ]
      }
    );
  }
}

module PaginateEntry {
  export interface Props {
    canPaginate: boolean;
    onPaginateChange: (limit_or_offset: string) =>
      (event?: React.FormEvent) => void;
    paginateParams: {
      limit?: number;
      offset?: string;
    };
    text: React.DOMElement<any>;
  }
}
export = PaginateEntry;
