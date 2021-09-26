import React from "react";
import axios from "axios";

import LanguageSelect from "src/components/LanguageSelect";

import style from "./index.module.scss";

interface IState {
  value: string,
  translate: string,
  languages: Array<{
    language: string
  }> | null,
  sourceLang: string,
  targetLang: string
}

export default class extends React.Component<any, IState> {
  private timeout: any;

  constructor(props) {
    super(props);

    this.state = {
      value: "",
      translate: "",
      languages: null,
      sourceLang: "ru",
      targetLang: "en"
    };

    this.timeout = null;

    this.handleLanguageChange = this.handleLanguageChange.bind(this);
    this.handleSwapLanguage = this.handleSwapLanguage.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.translateText = this.translateText.bind(this);
  }

  async componentDidMount() {
    const { data } = await axios.get("/languages?key=AIzaSyAhoO1P-SPemCqJaiFGeqFdzyQ15kRUc3U");

    this.setState({
      languages: data.data.languages
    });
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  handleLanguageChange(e) {
    const { name, value } = e.target;

    this.setState({
      ...this.state,
      [name]: value
    });
  }

  handleSwapLanguage() {
    const {
      value,
      translate,
      sourceLang,
      targetLang
    } = this.state;

    this.setState({
      value: translate,
      translate: value,
      sourceLang: targetLang,
      targetLang: sourceLang
    });
  }

  handleInputChange(e) {
    const { value } = e.target;

    if (value.length > 500) {
      return;
    }

    this.setState({
      value
    }, () => {
      clearTimeout(this.timeout);

      this.timeout = setTimeout(this.translateText, 500);
    });
  }

  async translateText() {
    const { value, sourceLang, targetLang } = this.state;

    if (value.length === 0) {
      this.setState({
        translate: ""
      });

      return;
    }

    const { data } = await axios.post("?key=AIzaSyAhoO1P-SPemCqJaiFGeqFdzyQ15kRUc3U", {
      q: value,
      source: sourceLang,
      target: targetLang
    });

    this.setState({
      translate: data.data.translations[0].translatedText
    });
  }

  render() {
    const { value, translate, sourceLang, targetLang, languages } = this.state;

    return (
      <div>
        <div className={style.translate}>
          <div className={style.block}>
            {languages && (
              <LanguageSelect
                name="sourceLang"
                hidden={[targetLang]}
                languages={languages}
                value={sourceLang}
                onChange={this.handleLanguageChange}
              />
            )}
            <textarea value={value} placeholder="Введите текст для перевода" onChange={this.handleInputChange} />
            <div className={style.wordCount}>{value.length} / 500</div>
          </div>
          <div className={style.divider} onClick={this.handleSwapLanguage}>
            &#8644;
          </div>
          <div className={style.block}>
            {languages && (
              <LanguageSelect
                name="targetLang"
                hidden={[sourceLang]}
                languages={languages}
                value={targetLang}
                onChange={this.handleLanguageChange}
              />
            )}
            {translate}
          </div>
        </div>
      </div>
    );
  }
}