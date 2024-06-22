'use client'
import { useRef, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import Skeleton from '../skeleton/skeleton';
import Button from '../button/Button';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.mjs`;
const options = {
    cMapUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/cmaps/`,
};
const RenderPdf = ({ url }) => {
    const [numPages, setNumPages] = useState();
    const [pageNumber, setPageNumber] = useState(1);
    // const [width, setWidth] = useState(w);
    const [download, setDownload] = useState(false);
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
        <div className="relative w-inherit overflow-hidden pointer-events-none" ref={docRef}>
            <Document options={options} file={url} onLoadSuccess={onDocumentLoadSuccess} loading={<Skeleton className={`w-full aspect-video`} />}>
                <Page pageNumber={pageNumber} canvasBackground='transparent' loading={<Skeleton className={`w-full aspect-video`} />} />
            </Document>
            {
                download ?
                    <Button className="absolute top-0 left-0" onClick={() => window.open(url, '_blank')}>Download</Button>
                    :
                    null
            }
        </div>
    )
}

export default RenderPdf
