import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function ItemsLoader() {
    return(
        <>
            <Skeleton height={200} count={3} className="mb-3" />
        </>
    )
};
