export interface ICardProps {
  children: React.ReactNode
  isActive?: boolean
  onLongPress?: () => void
  onPressOut?: () => void
  testID?: string
}
