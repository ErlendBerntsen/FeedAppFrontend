import axios from "axios";

const url = "http://localhost:8080/polls/"

class PollService {

    getAllPolls(requestParam) {
        const currentUser = JSON.parse(localStorage.getItem('user'));
        const config = !currentUser ? null : { headers: { Authorization: JSON.parse(localStorage.getItem("user")).token } }
        return axios.get(url+requestParam, config)
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
        const config = { headers: { Authorization: currentUser.token } }; 
        return axios.post(url, body, config)
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

    getResults(pollId) {
        return axios.get(url + pollId + "/result/" )
    }



}

export default new PollService()