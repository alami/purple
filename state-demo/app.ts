class DocumentItem {
  constructor() {
    this.setState (new DraftDocumentItemState())
  }
  public text: string
  private state: DocumentItemState
  getState() { return this.state }
  setState(state: DocumentItemState) {
    this.state = state
    this.state.setContext(this)
  }
  publishDoc() { this.state.publish() }
  deleteDoc() { this.state.delete() }
}
abstract class DocumentItemState {
  public name: string
  public item: DocumentItem

  public setContext(item: DocumentItem) {
    this.item = item
  }
  public abstract publish(): void
  public abstract delete(): void
}
class DraftDocumentItemState extends DocumentItemState{
  constructor() {
    super()
    this.name = 'DraftDocument'
    //this.item = item
  }

  publish(): void {
    console.log(`Doc published in the site: ${this.item.text}`)
    this.item.setState(new PublishDocumentItemState())
  }

  delete(): void {
    console.log(`Doc delete TOTAL: ${this.item.text}`)
  }
}
class PublishDocumentItemState extends DocumentItemState{
  constructor() {
    super()
    this.name = 'PublishDocument'
    //this.item = item
  }
  publish(): void {
    console.log(`!!  Doc can't publish AGAIN !!: ${this.item.text}`)
  }
  delete(): void {
    console.log(`Doc sent to draft: ${this.item.text}`)
    this.item.setState(new DraftDocumentItemState())
  }
}

const item = new DocumentItem()
item.text = 'Newest Newest News.'

console.log(item.getState())

item.publishDoc()
console.log(item.getState())

item.publishDoc()
console.log(item.getState())

item.deleteDoc()
console.log(item.getState())

