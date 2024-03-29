export function Inputbox({label, placeholder, type, func}) {
    return (
        <div className="flex flex-col items-start">
            <p className="text-lg py-2 font-medium text-left">{label}</p>
            <input type={type} placeholder={placeholder} className="rounded-sm text-gray-900 border-2 py-2 px-2 w-full" onChange={func}></input>
        </div>
    )
}