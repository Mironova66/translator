import React, {ChangeEventHandler} from "react";

import languagesLocalization from "src/ts";

interface IProps {
    name: string,
    languages: Array<{
        language: string
    }>
    value: string,
    hidden?: Array<string>,
    onChange: ChangeEventHandler
}

export default class extends React.Component<IProps, any> {
    constructor(props) {
        super(props);
    }

    render() {
        const { value, name, languages, hidden = [], onChange } = this.props;

        return (
            <select name={name} value={value} onChange={onChange}>
                {languages.map((item, index) => hidden.indexOf(item.language) === -1 && (
                    <option key={index} value={item.language}>{languagesLocalization[item.language] ? languagesLocalization[item.language].name : item.language}</option>
                ))}
            </select>
        )
    }
}