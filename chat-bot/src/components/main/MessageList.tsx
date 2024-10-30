import React from 'react';
import ReactMarkdown from 'react-markdown';
// import { LoadingDots } from '@/components/other';
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from '@/components/other/accordion/Accordion';
import remarkGfm from 'remark-gfm';




function MessageList() {
    return (
        <>
            <div className="overflow-y-auto">
                <div>
                    <div className={'bg-gray-700/50'}>
                        <div className="flex items-center justify-start max-w-full sm:max-w-4xl  mx-auto overflow-hidden px-2 sm:px-4">
                            <div className="flex flex-col w-full">
                                <div className="w-full text-gray-300 p-2 sm:p-4 overflow-wrap break-words">
                                    <span
                                        className={`mt-2 inline-flex items-center rounded-md px-2 py-1 text-xs sm:text-sm font-medium ring-1 ring-inset bg-purple-400/10 text-purple-400 ring-purple-400/30`}
                                    >
                                        YOU
                                    </span>
                                    <div className="mx-auto max-w-full">
                                        <ReactMarkdown
                                            // linkTarget="_blank"
                                            className="markdown text-xs sm:text-sm md:text-base leading-relaxed"
                                            remarkPlugins={[remarkGfm]}
                                        >
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio illum eaque cum ducimus nemo enim in officia dolores veniam non placeat ea debitis ipsum ullam illo quas, laboriosam doloremque maxime.
                                        </ReactMarkdown>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className={'bg-gray-800'}>
                        <div className="flex items-center justify-start max-w-full sm:max-w-4xl  mx-auto overflow-hidden px-2 sm:px-4">
                            <div className="flex flex-col w-full">
                                <div className="w-full text-gray-300 p-2 sm:p-4 overflow-wrap break-words">
                                    <span
                                        className={`mt-2 inline-flex items-center rounded-md px-2 py-1 text-xs sm:text-sm font-medium ring-1 ring-inset bg-indigo-400/10 text-indigo-400 ring-indigo-400/30`}
                                    >
                                        AL
                                    </span>
                                    <div className="mx-auto max-w-full">
                                        <ReactMarkdown
                                            // linkTarget="_blank"
                                            className="markdown text-xs sm:text-sm md:text-base leading-relaxed"
                                            remarkPlugins={[remarkGfm]}
                                        >
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio illum eaque cum ducimus nemo enim in officia dolores veniam non placeat ea debitis ipsum ullam illo quas, laboriosam doloremque maxime.
                                        </ReactMarkdown>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MessageList;
