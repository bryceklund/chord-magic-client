import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import { BrowserRouter } from 'react-router-dom'
import Login from './Login'
import Register from './Register'

describe(`Account Pages`, () => {
    it(`login renders without crashing`, () => {
        const div = document.createElement('div')
        ReactDOM.render(<BrowserRouter>
                            <Login />
                        </BrowserRouter>, div)
        ReactDOM.unmountComponentAtNode(div)
    })
    it(`login matches its snapshot`, () => {
        const tree = renderer.create(<BrowserRouter>
                                        <Login />
                                    </BrowserRouter>)
                                    .toJSON()
        expect(tree).toMatchSnapshot()
    })

    it(`register renders without crashing`, () => {
        const div = document.createElement('html') //body cannot be a child element of ...anything?
        ReactDOM.render(<BrowserRouter>
                            <Register />
                        </BrowserRouter>, div)
        ReactDOM.unmountComponentAtNode(div)
    })
    it(`register matches its snapshot`, () => {
        const tree = renderer.create(<BrowserRouter>
                                        <Register />
                                    </BrowserRouter>)
                                    .toJSON()
        expect(tree).toMatchSnapshot()
    })
})