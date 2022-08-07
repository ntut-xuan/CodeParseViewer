function Tag(props){
    let tag_name = props.name
    let tag_type = props.type
    let classNameString = ""
    if(tag_type == "Variable"){
        classNameString = "text-amber-500 bg-amber-100 text-bg p-1 w-fit rounded-md"
    }
    let render_item = <pre>test<span className={classNameString}>{tag_name}</span></pre>
    return render_item
}

function createMarkup(code) {
    code = code.replace("sc", '<span class="text-amber-500 bg-amber-100 text-bg p-0.5 w-fit rounded-md">sc</span>')
    code = code.replace("word", '<span class="text-amber-500 bg-amber-100 text-bg p-0.5 w-fit rounded-md">word</span>')
    code = code.replace("word2", '<span class="text-amber-500 bg-amber-100 text-bg p-0.5 w-fit rounded-md">word2</span>')
    return {__html: code};
  }

function CodeResult(props){
    let code = props.code;
    return <pre dangerouslySetInnerHTML={createMarkup(code)}></pre>;
}

class App extends React.Component{
    constructor(props){
        super(props)
        this.state = {editor: null};
        this.handleOnClick = this.handleOnClick.bind(this)
    }
    componentDidMount(){
        let textarea = document.getElementById("code_area");
        let editor = CodeMirror.fromTextArea(textarea, {
            lineNumbers: true,
            matchBrackets: true,
            mode: "text/x-c++src",
            theme: "darcula"
        });
        editor.setSize("100%", "100%")
        this.setState({editor: editor})
    }
    handleOnClick(){
        let {editor} = this.state;
        let raw_code = editor.getValue();   
        const root = ReactDOM.createRoot(document.getElementById("code_result"));
        root.render(<CodeResult code={raw_code} />)
    }
    render() {
        return (
            <div className="bg-blue-200 w-screen h-screen p-5 flex flex-col gap-5">
                <div id="title" className="text-center w-full">
                    <p className="text-2xl p-5 bg-white rounded-md"> Code Parse Viewer </p>
                </div>
                <div id="body" className="flex flex-row gap-5 h-[85%]">
                    <div className="w-full bg-white p-5 rounded-md">
                        <textarea id="code_area" className="w-full h-full resize-none"></textarea>
                    </div>
                    <div id="code_result" className="w-full bg-white p-5 rounded-md">
                        
                    </div>
                </div>
                <button className="w-full p-2 text-white bg-blue-500 rounded-md text-2xl hover:bg-blue-400 transition-all duration-500" onClick={this.handleOnClick}> 運行 </button>
            </div>
        )
    }
}

const app = ReactDOM.createRoot(document.getElementById("app"));
app.render(<App />)