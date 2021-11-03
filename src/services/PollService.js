import axios from "axios";

const url = "http://localhost:8080/polls/"

class PollService {

    getAllPolls() {
        return axios.get(url)
    }

    getPoll(id) {
        return axios.get(url + id)
    }

    deletePoll(id) {
        const config = { headers: { Authorization: JSON.parse(localStorage.getItem("user")).token } };
        return axios.delete(url + id, config)
    }

    createPoll(question, votingStart, votingEnd, isPrivate) {
        const currentUser = JSON.parse(localStorage.getItem('user'));
        const body = { creatorId: currentUser.id, question: question, votingStart: votingStart, votingEnd: votingEnd, isPrivate: isPrivate }
        return axios.post(url, body)
    }

    addVote(pollId, optionChosen, voteType) {
        const currentUser = JSON.parse(localStorage.getItem('user'));
        const voterId = !currentUser ? null : currentUser.id
        const body = { pollId: pollId, voterId: voterId, optionChosen: optionChosen, voteType: voteType }
        return axios.post(url + pollId + "/votes", body)
    }

    getAllVotes(pollId) {
        return axios.get(url + pollId + "/votes")
    }

    getVote(pollId, voteId) {
        const config = { headers: { Authorization: JSON.parse(localStorage.getItem("user")).token } };
        return axios.get(url + pollId + "/votes/" + voteId, config)
    }

    deletevote(pollId, voteId) {
        const config = { headers: { Authorization: JSON.parse(localStorage.getItem("user")).token } };
        return axios.delete(url + pollId + "/votes/" + voteId, config)
    }



}

export default new PollService()