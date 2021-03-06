const inherits = require('util').inherits
const Component = require('react').Component
const h = require('react-hyperscript')
const connect = require('react-redux').connect
const actions = require('./actions')
const extension = require('../../app/scripts/lib/extension')

module.exports = connect(mapStateToProps)(InfoScreen)

function mapStateToProps (state) {
  return {}
}

inherits(InfoScreen, Component)
function InfoScreen () {
  Component.call(this)
}

InfoScreen.prototype.render = function () {
  var state = this.props
  var manifest
  try {
    manifest = extension.runtime.getManifest()
  } catch (e) {
    manifest = { version: '2.0.0' }
  }

  return (
    h('.flex-column.flex-grow', [

      // subtitle and nav
      h('.section-title.flex-row.flex-center', [
        h('i.fa.fa-arrow-left.fa-lg.cursor-pointer', {
          onClick: (event) => {
            state.dispatch(actions.goHome())
          },
        }),
        h('h2.page-subtitle', 'Info'),
      ]),

      // main view
      h('.flex-column.flex-justify-center.flex-grow.select-none', [
        h('.flex-space-around', {
          style: {
            padding: '20px',
          },
        }, [
          // current version number

          h('.info.info-gray', [
            h('div', 'Metamask'),
            h('div', {
              style: {
                marginBottom: '10px',
              },
            }, `Version: ${manifest.version}`),
          ]),

          h('hr', {
            style: {
              margin: '20px 0 ',
              width: '7em',
            },
          }),

          h('.info',
            `For more information on MetaMask
             you can visit our web site. If you want to
             contact us with questions or just
             say 'Hi', you can find us on these platforms:`),

          h('div', {
            style: {
              paddingLeft: '30px',
            }},
            [
              h('div', [
                h('a', {
                  href: 'https://metamask.io/',
                  target: '_blank',
                  onClick (event) { this.navigateTo(event.target.href) },
                }, [
                  h('img.icon-size', {
                    src: manifest.icons[128],
                  }),
                  h('div.info', 'Visit our web site'),
                ]),
              ]),
              h('div.fa.fa-slack', [
                h('a.info', {
                  href: 'http://slack.metamask.io',
                  target: '_blank',
                  onClick (event) { this.navigateTo(event.target.href) },
                }, 'Join the conversation on Slack'),
              ]),

              h('div.fa.fa-twitter', [
                h('a.info', {
                  href: 'https://twitter.com/metamask_io',
                  target: '_blank',
                  onClick (event) { this.navigateTo(event.target.href) },
                }, 'Follow us on Twitter'),
              ]),

              h('div.fa.fa-envelope', [
                h('a.info', {
                  target: '_blank',
                  style: { width: '85vw' },
                  onClick () { extension.tabs.create({url: 'mailto:help@metamask.io?subject=Feedback'}) },
                }, 'Email us any questions or comments!'),
              ]),

              h('div.fa.fa-github', [
                h('a.info', {
                  href: 'https://github.com/metamask/talk/issues',
                  target: '_blank',
                  onClick (event) { this.navigateTo(event.target.href) },
                }, 'Start a thread on Github'),
              ]),
            ]),
        ]),
      ]),
    ])
  )
}

InfoScreen.prototype.navigateTo = function (url) {
  extension.tabs.create({ url })
}
