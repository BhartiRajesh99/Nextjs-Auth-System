import Link from "next/link";

export default function Button(props: any){
    const {data, bgColor} = props;
    return (
        <Link href={data === 'signin'? '/login' : '/signup'} className={`${bgColor} box-border border-1 border-black active:scale-95 cursor-pointer text-white font-semibold px-5 py-2 rounded-3xl`}>
            {data}
        </Link>
    )
}