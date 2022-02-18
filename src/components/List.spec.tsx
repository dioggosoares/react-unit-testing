import { render, waitFor, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import List from './List'

describe('List Component', () => {
  it('should render list items', async () => {
    const { getByText, rerender } = render(<List initialItems={['Diogo', 'Janara', 'Eduarda', 'Enzo']} />)

    expect(getByText('Diogo')).toBeInTheDocument()
    expect(getByText('Janara')).toBeInTheDocument()
    expect(getByText('Eduarda')).toBeInTheDocument()
    expect(getByText('Enzo')).toBeInTheDocument()

    // rerender está falhando o teste, depois descobrir porque
    rerender(<List initialItems={['Giovana']} />)

    expect(screen.getByText('Giovana')).toBeInTheDocument()
    expect(screen.queryByText('Enzo')).not.toBeInTheDocument()
  })

  // adicionar elemento
  it('should be able to add new item to the list', async () => {
    const { getByText, getByPlaceholderText, findByText } = render(<List initialItems={[]} />)

    const inputElement = getByPlaceholderText('Novo item')
    const addButton = getByText('Adicionar')

    userEvent.type(inputElement, 'Novin')
    userEvent.click(addButton)

    // alternativa com waitFor para esperar o setTimeout da lista
    await waitFor(() => {
      expect(getByText('Novin')).toBeInTheDocument()
    })
  })

  // remover elemento
  it('should be able to add remove item from the list', async () => {
    const { getAllByText, queryByText } = render(<List initialItems={['Eduarda']} />)

    const removeButtons = getAllByText('Remover')

    userEvent.click(removeButtons[0])

    // alternativa com waitFor para esperar o setTimeout usando NOT
    await waitFor(() => {
      expect(queryByText('Eduarda')).not.toBeInTheDocument()
    })
  })
})