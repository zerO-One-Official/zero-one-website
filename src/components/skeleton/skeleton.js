
const Skeleton = ({ className, children }) => {
    return (
        <div className={`animate-pulse bg-white/20 shadow-cus border border-white/5 rounded-3xl ${className || ''}`}>
            {children}
        </div>
    )
}

export default Skeleton
