import React from 'react'
import clsx from 'clsx'

interface Props extends React.PropsWithChildren{
  className?: string;
  onClick?: () => void;
  isActive?: boolean;
}

const Cell: React.FC<Props> = ({isActive = false, children, className, onClick}) => {
  const conditionalClasses = onClick && !isActive ? 'cursor-pointer hover:bg-gray-100 active:bg-gray-200' : '';
  const activeClasses = isActive ? 'bg-blue-400 hover:bg-blue-500 text-white' : '';
  return (
    <div className={clsx("h-12 flex items-center justify-center border-b border-r", conditionalClasses, activeClasses, className)} onClick={onClick}>{children}</div>
  )
}

export default Cell