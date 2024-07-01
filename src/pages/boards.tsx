import Button from '../components/button'

export default function boards() {
  return (
    <div>
      <h1>Boards</h1>
      <Button to="/boards/new" variant="primary">
        글쓰기
      </Button>
    </div>
  )
}
