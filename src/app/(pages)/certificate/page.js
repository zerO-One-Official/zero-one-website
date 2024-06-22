import { getCertificate } from "@/action/certificate"
import FilledCertificate from "@/components/certificates/FilledCertificate";
import { redirect } from "next/navigation";
import { TbCertificateOff } from "react-icons/tb";


export async function generateMetadata({ searchParams }) {
    // read route params
    const query = new URLSearchParams(searchParams);


    const certificateNumber = query.get('cn')

    if (!certificateNumber)
        return {
            title: 'Certificate not found',
        };

    const certificate = await getCertificate(certificateNumber)

    return {
        title: certificate.user.firstName + ' ' + certificate.user.lastName,
    };
}

const CertificateNumber = async ({ searchParams }) => {

    const query = new URLSearchParams(searchParams);


    const certificateNumber = query.get('cn')

    if (!certificateNumber) redirect('/');

    const certificate = await getCertificate(certificateNumber)

    if (!certificate) {
        return <div className="card p-6 flex items-center justify-center min-h-[calc(100vh-83px)] relative">
            <p className="text-accent font-semibold sm:text-2xl text-4xl">Certificate not found</p>
            <TbCertificateOff className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 stroke-zinc-900 sm:text-[300px] text-[500px]" />
        </div>
    }

    return (
        <div className="flex min-h-[calc(100vh-83px)] items-center justify-center p-2 pt-10">
            <div className="w-4/5">
                <FilledCertificate certificate={JSON.stringify(certificate)} download />
            </div>
        </div>
    )
}

export default CertificateNumber
