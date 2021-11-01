import axios from "axios";

const url = "http://localhost:8080/polls/"

class PollService {

    getAllPolls() {
        return axios.get(url)
    }

    getPoll(id) {
        const config = { headers: { Authorization: JSON.parse(localStorage.getItem("user")).token } };
        return axios.get(url + id, config)
    }

    deletePoll(id) {
        const config = { headers: { Authorization: JSON.parse(localStorage.getItem("user")).token } };
        return axios.delete(url + id, config)
    }

    createPoll(question, votingStart, votingEnd, isPrivate) {
        const creatorId = JSON.parse(localStorage.getItem("user")).id //get id of current user
        if (!creatorId) {
            //TODO: don't know if this check is necessary. add error handling if it is. 
        }
        const body = { creatorId: creatorId, question: question, votingStart: votingStart, votingEnd: votingEnd, isPrivate: isPrivate }
        return axios.post(url, body)
    }

    addVote(pollId, voterId, optionChosen, voteType) {
        const body = { pollId: pollId, voterId: voterId, optionChosen: optionChosen, voteType: voteType }
        return axios.post(url + pollId + "/votes")
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