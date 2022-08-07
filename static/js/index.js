var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function Tag(props) {
    var tag_name = props.name;
    var tag_type = props.type;
    var classNameString = "";
    if (tag_type == "Variable") {
        classNameString = "text-amber-500 bg-amber-100 text-bg p-1 w-fit rounded-md";
    }
    var render_item = React.createElement(
        "pre",
        null,
        "test",
        React.createElement(
            "span",
            { className: classNameString },
            tag_name
        )
    );
    return render_item;
}

function createMarkup(code) {
    code = code.replace("sc", '<span class="text-amber-500 bg-amber-100 text-bg p-0.5 w-fit rounded-md">sc</span>');
    code = code.replace("word", '<span class="text-amber-500 bg-amber-100 text-bg p-0.5 w-fit rounded-md">word</span>');
    code = code.replace("word2", '<span class="text-amber-500 bg-amber-100 text-bg p-0.5 w-fit rounded-md">word2</span>');
    return { __html: code };
}

function CodeResult(props) {
    var code = props.code;
    return React.createElement("pre", { dangerouslySetInnerHTML: createMarkup(code) });
}

var App = function (_React$Component) {
    _inherits(App, _React$Component);

    function App(props) {
        _classCallCheck(this, App);

        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

        _this.state = { editor: null };
        _this.handleOnClick = _this.handleOnClick.bind(_this);
        return _this;
    }

    _createClass(App, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var textarea = document.getElementById("code_area");
            var editor = CodeMirror.fromTextArea(textarea, {
                lineNumbers: true,
                matchBrackets: true,
                mode: "text/x-c++src",
                theme: "darcula"
            });
            editor.setSize("100%", "100%");
            this.setState({ editor: editor });
        }
    }, {
        key: "handleOnClick",
        value: function handleOnClick() {
            var editor = this.state.editor;

            var raw_code = editor.getValue();
            var root = ReactDOM.createRoot(document.getElementById("code_result"));
            root.render(React.createElement(CodeResult, { code: raw_code }));
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "bg-blue-200 w-screen h-screen p-5 flex flex-col gap-5" },
                React.createElement(
                    "div",
                    { id: "title", className: "text-center w-full" },
                    React.createElement(
                        "p",
                        { className: "text-2xl p-5 bg-white rounded-md" },
                        " Code Parse Viewer "
                    )
                ),
                React.createElement(
                    "div",
                    { id: "body", className: "flex flex-row gap-5 h-[85%]" },
                    React.createElement(
                        "div",
                        { className: "w-full bg-white p-5 rounded-md" },
                        React.createElement("textarea", { id: "code_area", className: "w-full h-full resize-none" })
                    ),
                    React.createElement("div", { id: "code_result", className: "w-full bg-white p-5 rounded-md" })
                ),
                React.createElement(
                    "button",
                    { className: "w-full p-2 text-white bg-blue-500 rounded-md text-2xl hover:bg-blue-400 transition-all duration-500", onClick: this.handleOnClick },
                    " \u904B\u884C "
                )
            );
        }
    }]);

    return App;
}(React.Component);

var app = ReactDOM.createRoot(document.getElementById("app"));
app.render(React.createElement(App, null));