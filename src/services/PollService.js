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
        return axios.delete(url + id)
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
        return axios.get(url + pollId + "/votes/" + voteId)
    }

    deletevote(pollId, voteId) {
        return axios.delete(url + pollId + "/votes/" + voteId)
    }



}

export default new PollService()