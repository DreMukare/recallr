import React from 'react';

/* projectFirestore.collection(currentUser.email).onSnapShot(snapshot => {
	setRecords(snapshot.docs.map(doc => doc.data()))
})

projectFirestore.collection(currentUser.email).doc('records').collection('records').add({
.....record data (date, procedures done, drugs given)
}) 
*/

const Records = () => {
	return (
		<div>
			<p>This is the medical records section</p>
		</div>
	);
};

export default Records;
