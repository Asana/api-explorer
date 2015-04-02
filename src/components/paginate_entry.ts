import React = require("react");

var r = React.DOM;

// TODO: Add tests.

/**
 * Allows users to change their pagination settings.
 */
class PaginateEntry extends React.Component<PaginateEntry.Props, {}> {
  static create = React.createFactory(PaginateEntry);

  private _renderPaginateInputs = () => {
    // If the values are not set, or 0, display empty string.
    var limit_value = !this.props.paginate_params.limit ?
      "" : this.props.paginate_params.limit.toString();
    var offset_value = !this.props.paginate_params.offset ?
      "" : this.props.paginate_params.offset.toString();

    console.log(this.props.paginate_params);

    return r.span({},
      r.input({
        type: "number",
        className: "paginate-entry-limit",
        min: "0",
        onChange: this.props.onPaginateChange("limit"),
        placeholder: "Limit",
        value: limit_value
      }, "Limit"),
      r.input({
        type: "text",
        className: "paginate-entry-offset",
        onChange: this.props.onPaginateChange("offset"),
        placeholder: "Offset",
        value: offset_value
      }, "Offset")
    );
  };

  render() {
    return r.div({
        className: "paginate-entry",
        children: [
          this.props.text,
          this.props.can_paginate ?
            this._renderPaginateInputs() :
            "Pagination is not available on this route."
        ]
      }
    );
  }
}

module PaginateEntry {
  export interface Props {
    can_paginate: boolean;
    onPaginateChange: (limit_or_offset: string) =>
      (event?: React.FormEvent) => void;
    paginate_params: {
      limit?: number;
      offset?: string;
    };
    text: string;
  }
}
export = PaginateEntry;
