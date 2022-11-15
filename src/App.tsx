import { useState } from 'react'
import './App.css'

function App() {
	const [sudokufield, setSudokufield] = useState<Array<Array<any>>>([[0], [0], [0], [0], [0], [0], [0], [0], [0]])
	let diff: string = "";

	const handleCellChange = function (row: number, column: number, val: number) {
		const newSudokufield: Array<any> = sudokufield.map((arr: Array<any>, index: number) => {
			if (index === row) {
				val ? arr[column] = val : arr[column] = 0;
				return arr;
			} else {
				return arr;
			}
		})

		setSudokufield(newSudokufield);
	}

	const renderRow = function (row: number) {
		let tmp: Array<JSX.Element> = []

		for (let cnt = 0; cnt < 9; cnt++) {

			tmp = [...tmp, <input className='sudokuinput' type="tel" maxLength={1} id={row + "_" + cnt} key={row.toString(10) + cnt.toString(10)} onChange={(ev) => {
				let val = Number(ev.target.value);
				handleCellChange(row, cnt, val);
			}
			}></input>]
		}

		return (
			<div className="row">
				{tmp}
			</div>
		);
	}

	const renderField = function () {
		let tmp: Array<JSX.Element> = [];

		for (let cnt = 0; cnt < 9; cnt++) {
			tmp.push(renderRow(cnt))
		};

		return tmp;
	}

	const resetField = function () {
		for (let cnt = 0; cnt < 9; cnt++) {
			for (let cnt2 = 0; cnt2 < 9; cnt2++) {
				let cell = document.getElementById(cnt + "_" + cnt2) as HTMLInputElement
				if (cell) {
					cell.value = "";
					cell.disabled = false;
				}

				setSudokufield([[0], [0], [0], [0], [0], [0], [0], [0], [0]])
			}
		}
	}

	const generateFieldVal = function (diff: string) {

		// this makes a field, but there is no guarantee it is solvable at all.
		let genStepField: number[][] = [];

		let avNums: number = 0;
		let newSudokufield;

		resetField()

		if (!diff) return;

		if (diff == "Easy") {
			avNums = 36
		};

		if (diff == "Medium") {
			avNums = 24
		};

		if (diff == "Hard") {
			avNums = 12
		};

		let randomRow: number = 0;
		let randomCol: number = 0;

		while (avNums != 0 && avNums) {

			randomRow = Math.ceil((Math.random() * 9) - 1)
			
			randomCol = Math.ceil((Math.random() * 9) - 1)
			
			let curNum = Math.ceil(Math.random() * 9)
			if (validateRowGen(randomRow, curNum) && validateColGen(randomCol, curNum) && validateSegGen(randomCol, randomRow, curNum)) {
				let cell = document.getElementById(randomRow + "_" + randomCol) as HTMLInputElement
				if (cell && cell.value == "") {
					cell.value = curNum.toString(10);
					cell.disabled = true;
					avNums--;
					console.log(avNums);

					genStepField = sudokufield.map((elm, idx) => {
						if (idx == randomRow) {
							elm[randomCol] = curNum
							return elm
						} else {
							return elm
						}
					})


				}
			}
		}

		setSudokufield(genStepField);
	}

	const validateRowGen = function (row: number, num: number) {
		let valid = true;

		sudokufield.map((arr, idx) => {
			if (idx === row) {
				if (arr.indexOf(num) === -1) {
					return arr;
				} else {
					valid = false;
					return arr;
				}
			}
		})

		return valid;
	}

	const validateColGen = function (col: number, num: number) {
		let valid = true;
		let tmp_col: number[] = [];

		let checkSudokufield = sudokufield.map((arr, idx) => {
			tmp_col.push(arr[col]);
		})

		if (tmp_col.indexOf(num) !== -1) {
			valid = false;
		}

		return valid;
	}

	const validateSegGen = function (col: number, row: number, num: number) {
		let valid = true;
		let tmp_seg: number[] = []

		// Top Rows
		if (col < 3 && row < 3) {
			let checkSudokufield = sudokufield.map((arr, idx) => {
				if (idx < 3) {
					for (let cnt = 0; cnt < 3; cnt++) {
						tmp_seg.push(arr[cnt] ? arr[cnt] : 0)
					}
				}
			})
		}

		if (col >= 3 && col < 6 && row < 3) {
			let checkSudokufield = sudokufield.map((arr, idx) => {
				if (idx < 3) {
					for (let cnt = 3; cnt < 6; cnt++) {
						tmp_seg.push(arr[cnt] ? arr[cnt] : 0)
					}
				}
			})
		}

		if (col >= 6 && row < 3) {
			let checkSudokufield = sudokufield.map((arr, idx) => {
				if (idx < 3) {
					for (let cnt = 6; cnt < 9; cnt++) {
						tmp_seg.push(arr[cnt] ? arr[cnt] : 0)
					}
				}
			})
		}

		// Middle Rows
		if (col < 3 && row >= 3) {
			let checkSudokufield = sudokufield.map((arr, idx) => {
				if (idx >= 3 && idx < 6) {
					for (let cnt = 0; cnt < 3; cnt++) {
						tmp_seg.push(arr[cnt] ? arr[cnt] : 0)
					}
				}
			})
		}

		if (col >= 3 && col < 6 && row >= 3) {
			let checkSudokufield = sudokufield.map((arr, idx) => {
				if (idx >= 3 && idx < 6) {
					for (let cnt = 3; cnt < 6; cnt++) {
						tmp_seg.push(arr[cnt] ? arr[cnt] : 0)
					}
				}
			})
		}

		if (col >= 6 && row >= 3) {
			let checkSudokufield = sudokufield.map((arr, idx) => {
				if (idx >= 3 && idx < 6) {
					for (let cnt = 6; cnt < 9; cnt++) {
						tmp_seg.push(arr[cnt] ? arr[cnt] : 0)
					}
				}
			})
		}

		//Bottom Rows
		if (col < 3 && row >= 6) {
			let checkSudokufield = sudokufield.map((arr, idx) => {
				if (idx >= 6) {
					for (let cnt = 0; cnt < 3; cnt++) {
						tmp_seg.push(arr[cnt] ? arr[cnt] : 0)
					}
				}
			})
		}

		if (col >= 3 && col < 6 && row >= 6) {
			let checkSudokufield = sudokufield.map((arr, idx) => {
				if (idx >= 6) {
					for (let cnt = 3; cnt < 6; cnt++) {
						tmp_seg.push(arr[cnt] ? arr[cnt] : 0)
					}
				}
			})
		}

		if (col >= 6 && row >= 6) {
			let checkSudokufield = sudokufield.map((arr, idx) => {
				if (idx >= 6) {
					for (let cnt = 6; cnt < 9; cnt++) {
						tmp_seg.push(arr[cnt] ? arr[cnt] : 0)
					}
				}
			})
		}

		if (tmp_seg.indexOf(num) !== -1) {
			valid = false;
		}

		return valid;
	}

	const validateSol = function () {
		let valid = true;

		for (let num = 1; num < 10; num++) {
			if (!valid) break;
			for (let row = 0; row < 9; row++) {
				if (!valid) break;
				for (let col = 0; col < 9; col++) {
					if (!validateColGen(col, num) && !validateRowGen(row, num) && !validateSegGen(col, row, num)) {
						console.log("row:" + row + " col:" + col + " number" + num)
						console.log("ValidColumn:" + !validateColGen(col, num))
						console.log("ValidRow:" + !validateRowGen(row, num))
						console.log("ValidSeg:" + !validateSegGen(col, row, num))
						valid = true
					} else {
						valid = false
						break;
					}
				}
			}
		}

		return valid;
	}

	const handleSubmit = function () {
		if (validateSol()) {
			alert("Congratulations!")
		} else {
			alert("Incorrect, try again!")
		}
	}

	return (
		<div className="grid-container">
			<div className="title"><small className='tiny'>~probably impossible~</small><span>Sudoku!</span></div>
			<div className="playfield">
				{renderField()}
			</div>
			<div className="buttons">
				<button className="submit" onClick={() => { handleSubmit() }}>Submit</button>
				<select name="Difficulty selector" id="difficulty">
					<option value="Easy">Easy</option>
					<option value="Medium">Medium</option>
					<option value="Hard">Hard</option>
				</select>
				<button className="new" onClick={() => {
					generateFieldVal((document.getElementById("difficulty") as HTMLSelectElement)?.value);
				}}>New</button>
			</div>
		</div>
	)
}

export default App
