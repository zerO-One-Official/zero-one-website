
const Skeleton = ({ className, children }) => {
    return (
        <div className={`animate-pulse bg-white/20 shadow-cus border border-l-white/5 border-t-white/5 border-r-black/25 border-b-black/25  rounded-3xl ${className || ''}`}>
            {children}
        </div>
    )
}

export default Skeleton
