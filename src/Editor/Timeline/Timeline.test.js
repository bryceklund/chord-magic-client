import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import { BrowserRouter } from 'react-router-dom'
import Timeline from './Timeline'
import { exportAllDeclaration } from '@babel/types'


describe(`Timeline`, () => {
    it(`renders without crashing`, () => {
        const div = document.createElement('div')
        ReactDOM.render(<BrowserRouter>
                            <Timeline />
                        </BrowserRouter>, div)
        ReactDOM.unmountComponentAtNode(div)
    })
    it(`matches its snapshot`, () => {
        const tree = renderer.create(<BrowserRouter>
                                        <Timeline />
                                    </BrowserRouter>)
                                    .toJSON()
        expect(tree).toMatchSnapshot()
    })
})