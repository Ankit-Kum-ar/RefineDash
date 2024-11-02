import CustomAvatar from "./custom-avatar"
import { Text } from "./text"

type Props = { // This is the Props type. It is used to define the type of the props.
    name: string // This is the name prop. It is used to define the name of the user.
    avatarUrl?: string // This is the avatarUrl prop. It is used to define the avatarUrl of the user.
    shape?: 'circle' | 'square' // This is the shape prop. It is used to define the shape of the avatar.
}

const SelectOptionWithAvatar = ({ avatarUrl, name, shape }: Props) => {
  return (
    <div
        style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
        }}
    >
      <CustomAvatar shape={shape} src={avatarUrl} name={name} /> {/* This is the CustomAvatar component. */}
      <Text>{name}</Text>
    </div>
  )
}

export default SelectOptionWithAvatar
