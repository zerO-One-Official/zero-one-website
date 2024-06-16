'use client'

import { useEffect, useState } from "react";
import generateCertificate from "@/utils/generateCertificate"
import toast from "react-hot-toast";
import { BsEye } from "react-icons/bs";
import RenderPdf from "./RenderPdf";
import Skeleton from "../skeleton/skeleton";

const FilledCertificate = ({ certificate: c }) => {
    const [certificate, setCertificate] = useState(null);
    const [url, setUrl] = useState(null);

    useEffect(() => {
        const setCertificateUrl = async () => {
            try {

                const parsedCertificate = JSON.parse(c);

                const fields = [...parsedCertificate.template.fields.map((f, i) => ({ ...f, value: parsedCertificate.fields[i].value })), { ...parsedCertificate.template.certificateNumber, value: parsedCertificate.certificateNumber }];

                const url = await generateCertificate(fields, parsedCertificate.template.url);
                setUrl(url);

            } catch (error) {
                toast.error(error.message);
            }
        }
        setCertificateUrl();
    }, [c])



    return (
        <div >
            {
                url ?
                    <div className="relative">
                        <RenderPdf url={url} />
                        <a href={url} target="_blank" className="absolute top-1 right-1 p-1 z-50 hover:bg-accent rounded-full backdrop-blur-lg">
                            <BsEye className="w-4 h-4" />
                        </a>
                    </div>
                    :
                    <Skeleton className={'w-full aspect-video'} />
            }
        </div>
    )
}

export default FilledCertificate
