/**
 * Set bit value
 * @param {"h"|"m"|"s"} section - One of the 3 sections (h,m,s)
 * @param {2|1} col - Column of the bit, right to left
 * @param {1|2|4|8} row - Row of the bit
 * @param {boolean=false} [value] - Is the bit true or false?
 */
function setBit(section, col, row, value = false) {
	const bit = document.getElementById(`${section}-${col}-${row}`);
	bit.innerText = value ? "🟢" : "🔵";
}

function loop() {
	const date = new Date();

	// Hour
	const hour = (date.getHours() % 12) || 12;
	let units = hour % 10;
	let tens = Math.floor(hour / 10);

	setBit("h", 2, 1, tens);

	let rest = units;
	let current = rest >= 8;
	if (current) rest -= 8;
	setBit("h", 1, 8, current);
	current = rest >= 4;
	if (current) rest -= 4;
	setBit("h", 1, 4, current);
	current = rest >= 2;
	if (current) rest -= 2;
	setBit("h", 1, 2, current);
	setBit("h", 1, 1, rest);

	// Minutes
	const minutes = date.getMinutes();
	units = minutes % 10;
	tens = Math.floor(minutes / 10);

	rest = tens;
	current = rest >= 4;
	if (current) rest -= 4;
	setBit("m", 2, 4, current);
	current = rest >= 2;
	if (current) rest -= 2;
	setBit("m", 2, 2, current);
	setBit("m", 2, 1, rest);

	rest = units;
	current = rest >= 8;
	if (current) rest -= 8;
	setBit("m", 1, 8, current);
	current = rest >= 4;
	if (current) rest -= 4;
	setBit("m", 1, 4, current);
	current = rest >= 2;
	if (current) rest -= 2;
	setBit("m", 1, 2, current);
	setBit("m", 1, 1, rest);

	const seconds = date.getSeconds();
	units = seconds % 10;
	tens = Math.floor(seconds / 10);

	rest = tens;
	current = rest >= 4;
	if (current) rest -= 4;
	setBit("s", 2, 4, current);
	current = rest >= 2;
	if (current) rest -= 2;
	setBit("s", 2, 2, current);
	setBit("s", 2, 1, rest);

	rest = units;
	current = rest >= 8;
	if (current) rest -= 8;
	setBit("s", 1, 8, current);
	current = rest >= 4;
	if (current) rest -= 4;
	setBit("s", 1, 4, current);
	current = rest >= 2;
	if (current) rest -= 2;
	setBit("s", 1, 2, current);
	setBit("s", 1, 1, rest);
}

setInterval(loop, 1000);
loop();