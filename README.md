# Technical challenge

## How to install and run the test

From the root folder run:

`npm install`

After installation run `npm link` to create a global link in the local machine

Run the app:

`comparison [path-to-file/file-with-plans.json] < [path-to-stdin/file]`

e.g.
`comparison /path/to/plans.json < inputs`

When calling the app from its folder (no npm link required):

`node /bin/comparison /path/to/plans.json < inputs`

## Results

1. The app reads the set of instructions listed on 'inputs' and produces its results as a list.
2. Instruction: `price` [annualCunsumptionKwh]: returns a list of plans containing; suppliers, plans and cost based on the annual cunsumption in Kwh.
3. Instruction: `usage` [[supplier] [plan_name] [monthly_consumption_pounds]] arguments are all mandatory, produces the amount of energy to be consumed annualy in (Kwh).
4. Instruction: `exit` terminates the execution of the process.

## Implementation

This app was developed using: node.js
it must be installed in order to verify its functionality and run unit testing

## Unit Testing

`npm test`

## notes

If both resources(plans.json and inputs) are in the same directory simply run it as follow:

`comparison plans.json < inputs`

without npm link

`node bin/comparison plans.json < inputs`