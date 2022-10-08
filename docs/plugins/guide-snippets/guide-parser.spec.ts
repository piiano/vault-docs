import {describe, it} from 'mocha'
import {expect} from "chai";
import {parseCommands, parseOutputs} from "./guide-parser";

describe('guide-parser', function () {

  it('parseCommands', function () {
    const content = `
#command:commandName1
echo "hello world"

#output:commandName1
#hello world

# another comment in between

#command:commandWithComment
# this will print "hello world!".
echo "hello world!"

#command: multiline
echo "line 1
line 2
line 3" | \
  grep 'line 2'

echo "unannotated command"

#  Command:  commandName2
echo "second command"
`
    const expectedCommands = {
      commandName1: 'echo "hello world"',
      commandWithComment: `# this will print "hello world!".
echo "hello world!"`,
      multiline: `echo "line 1
line 2
line 3" | \
  grep 'line 2'`,
      commandName2: 'echo "second command"'
    }
    const commands = parseCommands(content)
    expect(commands).to.deep.equal(expectedCommands)
  })

  it('parseOutputs', function () {
    const content = `
#command:commandName1
echo "hello world"

#output:outputForCommand1
#hello world

# another comment in between

#output:multilineOutput
#+-------------+
#|     ssn     |
#+-------------+
#| 123-12-1234 |
#+-------------+

#unannotated output
#abcd

#  Command:  commandName2
echo "second command"

#output:outputForCommand2
#second command
`
    const expectedOutputs = {
      outputForCommand1: 'hello world',
      multilineOutput: `+-------------+
|     ssn     |
+-------------+
| 123-12-1234 |
+-------------+`,
      outputForCommand2: 'second command'
    }
    const outputs = parseOutputs(content)
    expect(outputs).to.deep.equal(expectedOutputs)
  })
})
