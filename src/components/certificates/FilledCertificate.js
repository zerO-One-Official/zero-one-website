'use client'

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import generateCertificate from "@/utils/generateCertificate";
import RenderPdf from "./RenderPdf";
import Skeleton from "../skeleton/skeleton";
import { usePathname } from "next/navigation";
import Button from "../button/Button";

const FilledCertificate = ({ certificate: c, download = false }) => {
    const [certificateNumber, setCertificateNumber] = useState(null);
    const [url, setUrl] = useState(null);

    useEffect(() => {
        const setCertificateUrl = async () => {
            try {

                const parsedCertificate = JSON.parse(c);

                const fields = [...parsedCertificate.template.fields.map((f, i) => ({ ...f, value: parsedCertificate.fields[i].value })), { ...parsedCertificate.template.certificateNumber, value: parsedCertificate.certificateNumber }];
                const url = await generateCertificate(fields, parsedCertificate.template.url, parsedCertificate.certificateNumber);
                setUrl(url);
                setCertificateNumber(parsedCertificate.certificateNumber)

            } catch (error) {
                toast.error(error.message);
            }
        }
        setCertificateUrl();
    }, [c])


    const pathName = usePathname();


    return (
        <div >
            {
                url && certificateNumber ?
                    download ?
                        <div className="flex flex-col justify-center">
                            <RenderPdf url={url} />
                            <Link href={url} target="_blank" download={`${certificateNumber}.pdf`} className="flex w-full justify-end">
                                <Button className="max-w-min mt-3">
                                    Download
                                </Button>
                            </Link>
                        </div>
                        :
                        <RenderPdf url={url} />
                    :
                    <Skeleton className={'w-full aspect-video'} />
            }
        </div>
    )
}

export default FilledCertificate

