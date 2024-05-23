'use client'
import { Editor } from '@monaco-editor/react'
import { useEffect, useRef, useState } from 'react';
import Skeleton from '../skeleton/skeleton';
import Button from '../button/Button';
import { CiPlay1 } from 'react-icons/ci';
import { HiOutlinePaperAirplane } from 'react-icons/hi2';
import { BsGear } from 'react-icons/bs';
import toast from 'react-hot-toast';

const options = {
    mouseWheelZoom: true,
    snippetSuggestions: "bottom",
    suggest: { preview: true },
    wordWrap: 'bounded',
    formatOnPaste: true,
    cursorSmoothCaretAnimation: 'on',
    cursorBlinking: "phase",
    scrollbar: { verticalSliderSize: 10, horizontalScrollbarSize: 10, horizontalSliderSize: 10, verticalScrollbarSize: 10 },
    fontSize: 18,
    cursorStyle: 'underline',
}

const CodeEditor = ({ code, submitCode }) => {

    const editorRef = useRef(null);
    const popUpRef = useRef(null);

    const [settingOpen, setSettingOpen] = useState(false);
    const [language, setLanguage] = useState('cpp');
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [loading, setLoading] = useState('');
    const [defaultCode, setDefaultCode] = useState(`#include <iostream>
            
int main(){
    std::cout << "Hello Coders";
    return 0;
}`
    );

    function handleEditorDidMount(editor, monaco) {
        editorRef.current = editor;
    }

    useEffect(() => {
        const handleOutClick = (e) => {
            console.log(e.target, popUpRef)
            if (!popUpRef?.current?.contains(e.target)) {
                setSettingOpen(false);
            }
        };

        document.addEventListener("click", handleOutClick);
        return () => document.removeEventListener("click", handleOutClick);
    });

    const handleChange = (language) => {
        setLanguage(language)
        setSettingOpen(false)

    }

    const runCode = async () => {
        try {
            setLoading(true);
            setOutput('')
            const res = await fetch('/api/playground', {
                method: "POST",
                body: JSON.stringify({
                    code: editorRef.current.getValue(),
                    language,
                    input
                })
            })

            const data = await res.json()

            setOutput(data.output)

            data?.message && toast[data.type](data.message);

        } catch (error) {
            toast.error(error.message);
        }
        finally {
            setLoading(false);
        }
    }

    return (

        <div className="flex flex-col gap-2 ">
            <div className="ml-auto p-4 flex items-center gap-4">
                <button disabled={loading} ref={popUpRef} onClick={setSettingOpen} type='button' className={'relative shadow-btn p-4 border border-white/5 flex items-center justify-center rounded-full'}>
                    <BsGear className='shrink-0 w-5 h-5' />
                    {
                        settingOpen ?
                            <div className='absolute top-16 p-6 z-10 backdrop-blur-xl left-1/2 -translate-x-1/2 shadow-cus border border-l-white/5 border-t-white/5 border-r-black/25 border-b-black/25 rounded-3xl min-w-56'>
                                <h4 className='text-left font-semibold text-accent'>Language</h4>
                                <section className="space-y-2 mt-4 capitalize">
                                    <div className="flex items-center gap-2">
                                        <input type='radio' value='javascript' checked={language === 'javascript'} id="javascript" name='langauge' onChange={(e) => handleChange(e.target.value)} />
                                        <label htmlFor="javascript">javascript</label>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <input type='radio' value='python' checked={language === 'python'} id="python" name='langauge' onChange={(e) => handleChange(e.target.value)} />
                                        <label htmlFor="python">python</label>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <input type='radio' value='cpp' checked={language === 'cpp'} id="cpp" name='langauge' onChange={(e) => handleChange(e.target.value)} />
                                        <label htmlFor="cpp">C++</label>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <input type='radio' value='java' checked={language === 'java'} id="java" name='langauge' onChange={(e) => handleChange(e.target.value)} />
                                        <label htmlFor="java">java</label>
                                    </div>
                                </section>
                            </div>
                            :
                            null
                    }
                </button>
                <Button className={'shadow-btn'} onClick={runCode} loading={loading}>
                    <CiPlay1 className='w-4 h-4' />
                    Run
                </Button>
                <Button className={'group'} varrient={'filled'} loading={loading}>
                    <HiOutlinePaperAirplane className='w-4 h-4 stroke-primary  group-hover:stroke-primary-light' />
                    Submit
                </Button>
            </div>
            <div className='grid grid-cols-6 min-h-[calc(100vh-83px-64px-84px-20px)] gap-4'>
                <div className="min-h-[447px] col-span-4 xl:col-span-6 shadow-cus border border-l-white/5 border-t-white/5 border-r-black/25 border-b-black/25  rounded-3xl overflow-hidden">
                    <Editor
                        // options={options}
                        options={options}
                        theme='vs-dark'
                        defaultLanguage="cpp"
                        language={language} // java javascript cpp python
                        defaultValue={defaultCode}
                        onMount={handleEditorDidMount}
                        loading={<Skeleton className={'w-full h-full '} />}
                    />
                </div>
                <div className="col-span-2 xl:col-span-6 xl:h-56 md:h-96 p-2 flex flex-col xl:flex-row md:flex-col gap-4 overflow-hidden" direction='vertical'>
                    <div className="overflow-hidden bg-[#1e1e1e] w-full flex-1 flex flex-col gap-4 p-4 border border-l-white/5 border-t-white/5 border-r-black/25 border-b-black/25 rounded-3xl">
                        <h3 className='text-center font-semibold text-white/40 text-xl'>Input</h3>
                        <textarea disabled={loading} onChange={(e) => setInput(e.target.value)} className='overflow-auto bg-transparent outline-none h-full resize-none font-semibold' />

                    </div>
                    <div className="overflow-hidden bg-[#1e1e1e]  w-full flex-1 flex flex-col gap-4 p-4 border border-l-white/5 border-t-white/5 border-r-black/25 border-b-black/25 rounded-3xl">
                        <h3 className='text-center font-semibold text-white/40 text-xl'>Output</h3>
                        <textarea readOnly className='overflow-auto font-semibold bg-transparent outline-none h-full resize-none' value={output} />
                    </div>
                </div>
            </div>
        </div>

    )
}

export default CodeEditor
