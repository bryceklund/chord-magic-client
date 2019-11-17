import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import { BrowserRouter } from 'react-router-dom'
import SplashPage from './SplashPage'

describe(`SplashPage`, () => {
    it(`renders without crashing`, () => {
        const div = document.createElement('div')
        ReactDOM.render(
            <BrowserRouter>
                <SplashPage />
            </BrowserRouter>, div)
        ReactDOM.unmountComponentAtNode(div)
    })

    it(`matches its snapshot`, () => {
        const tree = renderer
                            .create(<BrowserRouter>
                                        <SplashPage />
                                    </BrowserRouter>)
                            .toJSON()
        expect(tree).toMatchSnapshot()
    })
})