'use client'
import { useRef, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import Skeleton from '../skeleton/skeleton';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.mjs`;
const options = {
    cMapUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/cmaps/`,
};
const RenderPdf = ({ url }) => {
    const [numPages, setNumPages] = useState();
    const [pageNumber, setPageNumber] = useState(1);
    // const [width, setWidth] = useState(w);
    const docRef = useRef();

    function onDocumentLoadSuccess(numPages) {
        setNumPages(numPages);
    }

    // useEffect(() => {
    //     const updateWidth = () => {
    //         if (docRef.current) {
    //             setWidth(w || docRef.current?.getBoundingClientRect().width)
    //         }
    //     }
    //     document.addEventListener('resize', updateWidth)

    //     return () => {
    //         document.removeEventListener('resize', updateWidth)
    //     }
    // }, [docRef.current?.getBoundingClientRect().width])

    return (
        url &&
        <div className="w-inherit overflow-hidden" ref={docRef}>
            <Document options={options} file={url} onLoadSuccess={onDocumentLoadSuccess} loading={<Skeleton className={`w-full aspect-video`} />}>
                <Page pageNumber={pageNumber} canvasBackground='transparent' loading={<Skeleton className={`w-full aspect-video`} />} />
            </Document>
        </div>
    )
}

export default RenderPdf
