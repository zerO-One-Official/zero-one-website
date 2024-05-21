
const Skeleton = ({ className, children }) => {
    return (
        <div className={`animate-pulse bg-white/5 rounded-lg ${className || ''}`}>
            {children}
        </div>
    )
}

export default Skeleton
