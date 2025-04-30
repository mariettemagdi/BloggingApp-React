import React from 'react'

export default function FormInput({name,value,type,placeholder,pattern,minLength,maxLength,title,icon,hint,onChange}) {
  return (
   <>
      <label className="input validator">
            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                {icon}
                <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
                >
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
                </g>
            </svg>
            <input
                name={name}
                type={type}
                value={value}
                required
                placeholder={placeholder}
                pattern={pattern}
                minLength={minLength}
                maxLength={maxLength ? maxLength : undefined}
                title={title}
                onChange={onChange}
            />
            </label>
            {hint&&<p className="validator-hint hidden">{hint}</p>}
   </>
  )
}
