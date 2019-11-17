import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import { BrowserRouter } from 'react-router-dom'
import Library from './Library'
import { exportAllDeclaration } from '@babel/types'

describe(`Library`, () => {
    it(`renders logged in without crashing`, () => {
        const div = document.createElement('div')
        ReactDOM.render(<BrowserRouter>
                            <Library signedIn={true} />
                        </BrowserRouter>, div)
        ReactDOM.unmountComponentAtNode(div)
    })
    it(`renders logged out without crashing`, () => {
        const div = document.createElement('div')
        ReactDOM.render(<BrowserRouter>
                            <Library signedIn={false} />
                        </BrowserRouter>, div)
        ReactDOM.unmountComponentAtNode(div)
    })
    it(`matches its snapshot`, () => {
        const tree = renderer.create(<BrowserRouter>
                                        <Library />
                                    </BrowserRouter>)
                                    .toJSON()
        expect(tree).toMatchSnapshot()
    })
})
