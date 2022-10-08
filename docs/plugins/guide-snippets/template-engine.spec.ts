import {describe, it} from 'mocha'
import {expect} from "chai";
import {parseTemplate, templateVariable} from "./template-engine";

describe('template-engine', function () {

  describe('regex for vars', function () {
    const testCases: Array<{
      template: string,
      match: Array<string> | null
    }> = [
      {
        template: '${{foo}}',
        match: [ '${{foo}}' ]
      }, {
        template: '${{  foo  }}',
        match: [ '${{  foo  }}' ]
      }, {
        template: '${{ FOO }}',
        match: [ '${{ FOO }}' ]
      }, {
        template: '${{ Foo_1 }}',
        match: [ '${{ Foo_1 }}' ]
      }, {
        template: 'line1\nbefore${{foo}}after\nline3',
        match: [ '${{foo}}' ]
      }, {
        template: 'foo${{ bar }}',
        match: [ '${{ bar }}' ]
      }, {
        template: 'foo${{ bar }}baz',
        match: [ '${{ bar }}' ]
      }, {
        template: '${{ foo }} bar ${{ baz }} abc',
        match: [ '${{ foo }}', '${{ baz }}' ]
      }, {
        template: 'abc\\${{ hello }}abc',
        match: null
      }, {
        template: '${foo}',
        match: null
      }, {
        template: '${{ foo bar }}',
        match: null
      },
    ]
    for (const testCase of testCases) {
      it(`${testCase.match ? 'pass' : 'fail'} for ${testCase.template}`, function () {
        const matches = testCase.template.match(templateVariable)
        expect(matches).to.deep.equal(testCase.match)
      })
    }
  })

  describe('parseTemplate', function () {
    const testCases: Array<{ template: string, variables: object } & ({ output: string } | { error: boolean })> = [
      {
        template: `\${{ wordA }} \${{ wordB }}!
Some more text.
Another var \${{ var }}.`,
        variables: {
          wordA: 'Hello',
          wordB: 'World',
          var: 'here',
        },
        output: `Hello World!
Some more text.
Another var here.`
      },{
        template: `\${{ wordA }} \${{ wordB }}!
Some more text.
Another var \${{ var }}.`,
        variables: {
          wordA: 'Hello',
          var: 'here',
        },
        error: true,
      }
    ]

    for (const testCase of testCases) {
      it(`${'error' in testCase ? 'fail' : 'pass'} for ${testCase.template}`, function () {
        const parseTemplateWithVars = () => parseTemplate(testCase.template, testCase.variables, false)
        if ('error' in testCase) {
          expect(parseTemplateWithVars).throws()
        } else {
          const output = parseTemplateWithVars()
          expect(output).to.equal(testCase.output)
        }
      })
    }
  });
})
