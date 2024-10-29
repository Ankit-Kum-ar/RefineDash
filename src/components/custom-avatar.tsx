import { getNameInitials } from '@/utilities'
import { Avatar as AntdAvatar, AvatarProps } from 'antd'

type Props = AvatarProps & {
    name?: string
}

const CustomAvatar = ({name, style, ...rest}: Props) => {
  return (
    <AntdAvatar
        alt={name}
        style={{ 
            cursor: 'pointer', 
            backgroundColor: '#055C9D', 
            verticalAlign: 'middle',
            display: 'flex',
            alignItems: 'center',
            border: 'none',
            ...style
        } }
        {...rest}
    >
        {getNameInitials(name || '')}
    </AntdAvatar>
  )
}

export default CustomAvatar
