import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import { BrowserRouter } from 'react-router-dom'
import Nav from './Nav'

describe('Nav', () => {
    it(`renders logged in without crashing`, () => {
        const div = document.createElement('div')
        ReactDOM.render(<BrowserRouter>
                            <Nav signedIn={true} />
                        </BrowserRouter>, div)
        ReactDOM.unmountComponentAtNode(div)
    })
    it(`renders logged out without crashing`, () => {
        const div = document.createElement('div')
        ReactDOM.render(<BrowserRouter>
                            <Nav signedIn={false} />
                        </BrowserRouter>, div)
        ReactDOM.unmountComponentAtNode(div)
    })
    it(`matches its snapshot`, () => {
        const tree = renderer.create(<BrowserRouter>
                                        <Nav />
                                    </BrowserRouter>)
                                .toJSON()
        expect(tree).toMatchSnapshot()
    })
})