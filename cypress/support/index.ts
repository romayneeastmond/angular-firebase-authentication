// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// When a command from ./commands is ready to use, import with `import './commands'` syntax
import './login.commands'
import addContext from 'mochawesome/addContext'

Cypress.on("test:after:run", (test, runnable) => {
    addContext({ test }, { title: "Video", value: `videos/${Cypress.spec.name.replace('/.js.*', '.js')}.mp4` })

    if (test.state === 'failed') {
        let parentTitle = runnable.parent!.title
        let pos = parentTitle.lastIndexOf('/')

        parentTitle = parentTitle.substring(0, pos) + parentTitle.substring(pos + 1)

        addContext({ test }, { title: "Screenshot", value: `screenshots/${Cypress.spec.name}/${parentTitle} -- ${test.title} (failed).png` })
    }
});
